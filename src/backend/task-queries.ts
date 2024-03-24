import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { AppDispatch } from "../store/store";
import { SetLoadingType } from "../types/set-loading-type";
import { TaskType } from "../types/task-type";
import { toastErr } from "../utils/toast";
import {
  addTask,
  defaultTask,
  deleteTask,
  setTasks,
  updateTask,
} from "./../store/tasks/task-list-slice";
import { db } from "./firebase";
import {
  FIREBASE_TASKS_COLL,
  FIREBASE_TASK_LISTS_COLL,
} from "./firebase-constants";

export const BE_bulkDeleteTasks = async (
  taskIds: string[],
  setLoading?: SetLoadingType,
  dispatch?: AppDispatch
) => {
  setLoading?.(true);

  const deleteOperations: Promise<void>[] = taskIds.map((taskId) => {
    return deleteDoc(doc(db, FIREBASE_TASKS_COLL, taskId));
  });

  await Promise.all(deleteOperations);
  setLoading?.(false);
  // dispatch?.(deleteTask)
};

export const BE_deleteTask = async (
  taskListId: string,
  taskId: string,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const taskRef = doc(
    db,
    FIREBASE_TASK_LISTS_COLL,
    taskListId,
    FIREBASE_TASKS_COLL,
    taskId
  );
  await deleteDoc(taskRef);

  const deletedDoc = await getDoc(taskRef);

  if (deletedDoc.exists()) {
    toastErr(`${BE_deleteTask}: Document not deleted`);
  }
  dispatch(deleteTask({ taskListId, taskId }));
  setLoading(false);
};

export const BE_addTask = async (
  taskListId: string,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const { title, description } = defaultTask;

  const task = await addDoc(
    collection(db, FIREBASE_TASK_LISTS_COLL, taskListId, FIREBASE_TASKS_COLL),
    {
      title,
      description,
    }
  );

  const newTaskDoc = await getDoc(doc(db, task.path));

  if (newTaskDoc.exists()) {
    const { title, description } = newTaskDoc.data();
    const newTask: TaskType = {
      id: newTaskDoc.id,
      title,
      description,
    };
    dispatch(addTask({ taskListId, task: newTask }));
    setLoading(false);
  } else {
    toastErr(`${BE_addTask.name}: No such document`);
    setLoading(false);
  }
};

export const BE_getTasks = async (
  taskListId: string,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const tasks = await getTasks(taskListId);
  dispatch(setTasks({ taskListId, tasks }));
  setLoading(false);
};

export const getTasks = async (taskListId: string): Promise<TaskType[]> => {
  const q = query(
    collection(db, FIREBASE_TASK_LISTS_COLL, taskListId, FIREBASE_TASKS_COLL)
  );
  const querySnapshot = await getDocs(q);
  const tasks: TaskType[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push({
      title: doc.data().title,
      description: doc.data().description,
      id: doc.id,
      editMode: false,
      collapsed: true,
    });
  });

  return tasks;
};

export const BE_updateTask = async (
  taskListId: string,
  taskId: string,
  taskData: TaskType,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const taskRef = doc(
    db,
    FIREBASE_TASK_LISTS_COLL,
    taskListId,
    FIREBASE_TASKS_COLL,
    taskId
  );

  await updateDoc(taskRef, taskData);

  const taskDoc = await getDoc(taskRef);

  if (taskDoc.exists()) {
    const taskData: TaskType = {
      id: taskDoc.id,
      title: taskDoc.data()!.title,
      description: taskDoc.data()!.description,
      editMode: false,
    };

    dispatch(updateTask({ taskListId, taskId, taskData }));
    setLoading(false);
  } else {
    toastErr(`${BE_updateTask.name}: Task could not be fetched from Firebase`);
    setLoading(false);
  }
};
