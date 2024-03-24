import { forwardRef, useEffect, useState } from "react";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import {
  BE_deleteTaskList,
  BE_updateTaskList,
} from "../../backend/task-list-queries";
import { BE_addTask, BE_getTasks } from "../../backend/task-queries";
import { useAppDispatch } from "../../hooks/redux-hooks";
import {
  switchTaskListEditMode,
  toggleCollapseAllTasks,
} from "../../store/tasks/task-list-slice";
import { TaskListType } from "../../types/task-list-type";
import Icon from "../UI/Icon";
import TasksLoader from "./TaskLoader";
import Tasks from "./Tasks";

type SingleTaskListProps = {} & TaskListType;
const SingleTaskList = forwardRef<HTMLDivElement, SingleTaskListProps>(
  ({ id, title, editMode, tasks }: SingleTaskListProps, ref) => {
    const [inputTitle, setInputTitle] = useState(title);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingGetTasks, setLoadingGetTasks] = useState(false);
    const [allCollapsed, setAllCollapsed] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (tasks?.length === undefined) {
        BE_getTasks(id!, dispatch, setLoadingGetTasks);
      }
    }, []);

    useEffect(() => {
      const checkAllCollapsed = () => {
        if (tasks) {
          for (const task of tasks) {
            if (!task.collapsed) {
              return setAllCollapsed(false);
            }
          }
          return setAllCollapsed(true);
        }
      };
      checkAllCollapsed();
    }, [tasks, allCollapsed]);

    function handleChangeInputTitle(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault;
      setInputTitle(e.target.value);
    }

    function handleSaveTaskList() {
      BE_updateTaskList(dispatch, setLoadingEdit, id!, { title: inputTitle });
    }

    function handleEditTaskList() {
      if (id) dispatch(switchTaskListEditMode({ id, editMode: true }));
    }

    function handleDeleteTaskList() {
      BE_deleteTaskList(id!, tasks!, dispatch, setLoadingDelete);
    }

    function handleEnterKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === "Enter") {
        handleSaveTaskList();
      }
    }

    function handleAddTask() {
      if (id) BE_addTask(id, dispatch, setLoadingAdd);
    }

    function handleToggleCollapseAllTasks() {
      dispatch(
        toggleCollapseAllTasks({ taskListId: id!, value: !allCollapsed })
      );
    }

    const editOrSaveComponent = editMode ? (
      <Icon
        IconName={MdSave}
        reduceOpacityOnHover
        onClick={handleSaveTaskList}
        loading={loadingEdit}
      />
    ) : (
      <Icon
        IconName={MdEdit}
        reduceOpacityOnHover
        onClick={handleEditTaskList}
        loading={loadingEdit}
      />
    );

    return (
      <div key={id} className="relative" ref={ref}>
        <div className="bg-[#d4f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap justify-center items-center bg-gradient-to-tr from-myBlue to-myPink text-white bg-opacity-20 p-3">
            {editMode ? (
              <input
                className="flex-1 bg-transparent placeholder-gray-400 px-3 py-1 mx-1 border-[1px] rounded-md border-white text-left"
                value={inputTitle}
                onChange={handleChangeInputTitle}
                onKeyDown={handleEnterKeyDown}
                placeholder="Enter task list title"
              />
            ) : (
              <p className="flex-1 justify-self-center text-left md:text-center">
                {title}
              </p>
            )}

            <div>
              {editOrSaveComponent}
              <Icon
                IconName={MdDelete}
                reduceOpacityOnHover
                onClick={handleDeleteTaskList}
                loading={loadingDelete}
              />
              <Icon
                IconName={MdKeyboardArrowDown}
                reduceOpacityOnHover
                className={`${allCollapsed ? "rotate-180" : "rotate-0"}`}
                onClick={handleToggleCollapseAllTasks}
              />
            </div>
          </div>
          {loadingGetTasks && <TasksLoader />}
          {!loadingGetTasks && tasks && tasks.length > 0 && (
            <Tasks taskListId={id!} tasks={tasks} />
          )}

          {tasks?.length === 0 ? (
            <p className="text-center p-4">No tasks added yet!</p>
          ) : null}
        </div>
        <Icon
          IconName={MdAdd}
          className="absolute -mt-3 -ml-4 p-3 drop-shadow-lg hover:bg-myPinkDark"
          loading={loadingAdd}
          onClick={handleAddTask}
        />
      </div>
    );
  }
);
export default SingleTaskList;
