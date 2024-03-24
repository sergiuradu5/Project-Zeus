import { forwardRef, useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { BE_deleteTask, BE_updateTask } from "../../backend/task-queries";
import { useAppDispatch } from "../../hooks/redux-hooks";
import {
  switchTaskEditMode,
  toggleCollapseTask,
} from "../../store/tasks/task-list-slice";
import { TaskType } from "../../types/task-type";
import Icon from "../UI/Icon";

type TaskProps = { taskListId: string; task: TaskType };
const Task = forwardRef<HTMLDivElement, TaskProps>(
  (
    {
      taskListId,
      task: { id: taskId, title, description, editMode, collapsed },
    },
    ref
  ) => {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [inputTitle, setInputTitle] = useState(title);
    const [inputDescription, setInputDescription] = useState(description);
    const dispatch = useAppDispatch();

    const [loadingDelete, setLoadingDelete] = useState(false);

    function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
      setInputTitle(e.target.value);
    }

    function handleChangeDescription(
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
      setInputDescription(e.target.value);
    }

    function handleSwitchEditMode() {
      dispatch(switchTaskEditMode({ taskListId, taskId: taskId! }));
    }

    function handleSaveTask() {
      const taskData: TaskType = {
        title: inputTitle,
        description: inputDescription,
      };
      BE_updateTask(taskListId, taskId!, taskData, dispatch, setLoadingEdit);
    }

    function handleOnClickCollapse() {
      dispatch(toggleCollapseTask({ taskListId, taskId: taskId! }));
    }

    function handleDeleteTask() {
      BE_deleteTask(taskListId, taskId!, dispatch, setLoadingDelete);
    }

    const inputTitleComponent = (
      <input
        className="z-2 border-2 px-2 border-myBlue focus:border-myBlue rounded-sm mb-1"
        placeholder="Task title"
        value={inputTitle}
        onChange={handleChangeTitle}
      />
    );
    const titleComponent = <p className="cursor-auto">{title}</p>;

    const inputDescriptionComponent = (
      <textarea
        className="z-2 w-full border-2 px-3 border-myBlue focus:border-myBlue rounded-sm mt-2"
        placeholder="Task description"
        value={inputDescription}
        onChange={handleChangeDescription}
      />
    );

    const descriptionComponent = (
      <p className="p-2 text-justify">{description}</p>
    );

    const editIcon = (
      <Icon
        IconName={MdEdit}
        reduceOpacityOnHover
        onClick={handleSwitchEditMode}
        size={16}
        className="text-myBlue"
      />
    );

    const saveIcon = (
      <Icon
        IconName={MdSave}
        reduceOpacityOnHover
        loading={loadingEdit}
        onClick={handleSaveTask}
        size={16}
        className="text-myBlue"
      />
    );

    return (
      <div
        key={taskId}
        className="bg-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md"
        ref={ref}
      >
        <div className="cursor-pointer" onClick={handleOnClickCollapse}>
          <div className="inline-block" onClick={(e) => e.stopPropagation()}>
            {editMode ? inputTitleComponent : titleComponent}
          </div>
        </div>
        {!collapsed && (
          <div
            className={`transition-all delay-300 ease-in-out duration-400 ${
              !collapsed ? "opacity-100" : "opacity-0"
            }`}
          >
            <hr />
            <div>
              {editMode ? inputDescriptionComponent : descriptionComponent}
              <div className="flex justify-end">
                {editMode ? saveIcon : editIcon}
                <Icon
                  IconName={MdDelete}
                  loading={loadingDelete}
                  reduceOpacityOnHover
                  onClick={handleDeleteTask}
                  size={16}
                  className="text-myBlue"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
export default Task;
