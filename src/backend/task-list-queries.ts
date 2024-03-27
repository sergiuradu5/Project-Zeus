import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorageUser } from "../local-storage/local-storage-functions";
import { AppDispatch } from "../store/store";
import {
  addTaskList,
  defaultTaskList,
  deleteTaskList,
  deleteTaskLists,
  setTaskLists,
  updateTaskList,
} from "../store/tasks/task-list-slice";
import { SetLoadingType } from "../types/set-loading-type";
import { TaskListType } from "../types/task-list-type";
import { TaskType } from "../types/task-type";
import { toastErr } from "../utils/toast";
import { db } from "./firebase";
import { FIREBASE_TASK_LISTS_COLL } from "./firebase-constants";
import { BE_bulkDeleteTasks, getTasks } from "./task-queries";

export const BE_addTaskList = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const { title } = defaultTaskList;
  addDoc(collection(db, FIREBASE_TASK_LISTS_COLL), {
    title,
    userId: getStorageUser()!.id,
    creationTime: serverTimestamp(),
  }).then(async (list) => {
    const taskListDoc = await getDoc(
      doc(db, FIREBASE_TASK_LISTS_COLL, list.id)
    );

    if (taskListDoc.exists()) {
      const taskList = {
        title: taskListDoc.data().title,
        id: taskListDoc.id,
        tasks: [],
      };
      dispatch(addTaskList(taskList));
      setLoading(false);
    } else {
      toastErr(`${BE_addTaskList.name}: No such doc exists`);
    }
  });
};

export const BE_getTaskLists = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const taskLists = await getTaskLists();
  dispatch(setTaskLists(taskLists));
  setLoading(false);
};

export const getTaskLists = async (): Promise<TaskListType[]> => {
  const q = query(
    collection(db, FIREBASE_TASK_LISTS_COLL),
    where("userId", "==", getStorageUser()!.id),
    orderBy("creationTime", "desc")
  );
  const querySnapshot = await getDocs(q);
  const taskLists: TaskListType[] = [];
  querySnapshot.forEach((doc) => {
    taskLists.push({
      title: doc.data().title,
      tasks: doc.data().tasks,
      id: doc.id,
    });
  });

  return taskLists;
};

export const BE_updateTaskList = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType,
  taskListId: string,
  taskListData: TaskListType
) => {
  setLoading(true);
  await updateDoc(doc(db, FIREBASE_TASK_LISTS_COLL, taskListId), taskListData);

  const taskListDoc = await getDoc(
    doc(db, FIREBASE_TASK_LISTS_COLL, taskListId)
  );

  if (taskListDoc.exists()) {
    const taskListData: TaskListType = {
      id: taskListDoc.id,
      title: taskListDoc.data()!.title,
      editMode: false,
      tasks: taskListDoc.data().tasks,
    };

    dispatch(updateTaskList(taskListData));
    setLoading(false);
  } else {
    toastErr(
      `${BE_updateTaskList.name}: TaskList could not be fetched from Firebase`
    );
    setLoading(false);
  }
};

export const BE_deleteTaskList = async (
  taskListId: string,
  tasks: TaskType[],
  dispatch?: AppDispatch,
  setLoading?: SetLoadingType
) => {
  setLoading?.(true);
  const taskIds: string[] = [];
  tasks?.forEach(({ id }) => {
    if (id) taskIds.push(id);
  });
  await BE_bulkDeleteTasks(taskIds);

  const taskListRef = doc(db, FIREBASE_TASK_LISTS_COLL, taskListId);

  await deleteDoc(taskListRef);

  const deletedTaskListDoc = await getDoc(taskListRef);

  if (!deletedTaskListDoc.exists()) {
    setLoading?.(false);
    dispatch?.(deleteTaskList({ id: taskListId }));
  }
};

export const BE_bulkDeleteTaskLists = async (
  dispatch: AppDispatch,
  setLoading?: SetLoadingType
) => {
  setLoading?.(true);
  const q = query(
    collection(db, FIREBASE_TASK_LISTS_COLL),
    where("userId", "==", getStorageUser()!.id),
    orderBy("creationTime", "desc")
  );

  const querySnapshot = await getDocs(q);
  const promises: Promise<void>[] = [];
  querySnapshot.forEach(async (doc) => {
    const taskListId = doc.data().id;
    const tasks = await getTasks(taskListId);
    const promise = BE_deleteTaskList(taskListId, tasks);
    promises.push(promise);
  });

  await Promise.all(promises);
  dispatch(deleteTaskLists());
};
