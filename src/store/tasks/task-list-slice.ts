import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../types/task-type";
import { TaskListType } from "./../../types/task-list-type";

export const defaultTask: TaskType = {
  title: "I'll do this at 9:00am",
  description: "This what I need to do",
  editMode: true,
  collapsed: true,
};

export const defaultTaskList: TaskListType = {
  title: "Sample task list",
  tasks: [defaultTask],
  editMode: true,
};
type TaskListState = {
  taskLists: TaskListType[];
};

const initialState: TaskListState = {
  taskLists: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskLists: (state, action: PayloadAction<TaskListType[]>) => {
      state.taskLists = action.payload;
    },

    deleteTaskLists: (state) => {
      state.taskLists = [];
    },

    addTaskList: (state, action: PayloadAction<TaskListType>) => {
      const taskList: TaskListType = { ...action.payload, editMode: true };
      state.taskLists.unshift(taskList);
    },

    updateTaskList: (state, action: PayloadAction<TaskListType>) => {
      const taskListData: TaskListType = { ...action.payload };
      const taskListIndexToUpdate = state.taskLists.findIndex(
        (taskList) => taskList.id === taskListData.id
      );
      const prevTaskList = state.taskLists[taskListIndexToUpdate];
      state.taskLists[taskListIndexToUpdate] = {
        ...taskListData,
        tasks: prevTaskList.tasks,
      };
    },

    switchTaskListEditMode: (
      state,
      action: PayloadAction<{ id: string; editMode?: boolean }>
    ) => {
      const { id, editMode } = action.payload;
      const taskListIndexToUpdate = state.taskLists.findIndex(
        (taskList) => taskList.id === id
      );
      const prevEditMode = state.taskLists[taskListIndexToUpdate].editMode;
      state.taskLists[taskListIndexToUpdate].editMode =
        typeof editMode === "boolean" ? editMode : !prevEditMode;
    },

    toggleCollapseAllTasks: (
      state,
      action: PayloadAction<{ taskListId: string; value?: boolean }>
    ) => {
      const { taskListId, value } = action.payload;
      const taskListIndex = state.taskLists.findIndex(
        ({ id }) => id === taskListId
      );
      if (taskListIndex >= 0) {
        // const updatedTasks = state.taskLists[taskListIndex].tasks?.map(task => ({task}))
        state.taskLists[taskListIndex].tasks?.forEach((task) =>
          value !== undefined
            ? (task.collapsed = value)
            : (task.collapsed = !task.collapsed)
        );
      }
    },

    deleteTaskList: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.taskLists = state.taskLists.filter(
        (taskList) => taskList.id !== id
      );
    },

    setTasks: (
      state,
      action: PayloadAction<{ taskListId: string; tasks: TaskType[] }>
    ) => {
      const { taskListId, tasks } = action.payload;

      const taskListIndex = state.taskLists.findIndex(
        ({ id }) => id === taskListId
      );

      if (taskListIndex >= 0) {
        state.taskLists[taskListIndex].tasks = tasks;
      }
    },

    addTask: (
      state,
      action: PayloadAction<{ taskListId: string; task: TaskType }>
    ) => {
      const { taskListId, task } = action.payload;

      const updatedTaskLists = state.taskLists.map((taskList) => {
        if (taskList.id === taskListId) {
          // Switch current task list edit mote to false
          taskList.editMode = false;

          // Switch off edit mode to all other tasks inside the current task list
          const tasks = taskList.tasks?.map((task) => {
            task.editMode = false;
            task.collapsed = true;
            return task;
          });

          // Push new task to task list
          const taskData = { ...task, editMode: true, collapsed: false };
          tasks?.push(taskData);

          taskList.tasks = tasks;
        }
        return taskList;
      });
      state.taskLists = updatedTaskLists;
    },

    updateTask: (
      state,
      action: PayloadAction<{
        taskListId: string;
        taskId: string;
        taskData: TaskType;
      }>
    ) => {
      const { taskListId, taskId, taskData } = action.payload;
      const taskList = state.taskLists.find(({ id }) => taskListId === id);
      if (taskList) {
        const taskIndex = taskList.tasks?.findIndex(({ id }) => taskId === id);
        if (taskIndex !== undefined && taskIndex >= 0) {
          const updatedTask = { ...taskData, id: taskId };
          if (taskList.tasks) {
            taskList.tasks[taskIndex] = updatedTask;
          }
        }
      }
    },

    deleteTask: (
      state,
      action: PayloadAction<{ taskListId: string; taskId: string }>
    ) => {
      const { taskListId, taskId } = action.payload;
      const taskListIndex = state.taskLists.findIndex(
        ({ id }) => id === taskListId
      );
      if (taskListIndex >= 0) {
        state.taskLists[taskListIndex].tasks = state.taskLists[
          taskListIndex
        ].tasks?.filter(({ id }) => id !== taskId);
      }
    },

    toggleCollapseTask: (
      state,
      action: PayloadAction<{ taskListId: string; taskId: string }>
    ) => {
      const { taskListId, taskId } = action.payload;
      const updatedTaskLists = state.taskLists.map((taskList) => {
        if (taskList.id === taskListId) {
          const updatedTasks = taskList.tasks?.map((task) => {
            if (task.id === taskId) {
              task.collapsed = !task.collapsed;
            }
            return task;
          });
          taskList.tasks = updatedTasks;
        }
        return taskList;
      });

      state.taskLists = updatedTaskLists;
    },

    switchTaskEditMode: (
      state,
      action: PayloadAction<{ taskListId: string; taskId: string }>
    ) => {
      const { taskListId, taskId } = action.payload;
      const taskList = state.taskLists.find(({ id }) => taskListId === id);
      if (taskList) {
        const task = taskList.tasks?.find(({ id }) => id === taskId);
        if (task) {
          task.editMode = !task.editMode;
        }
      }
    },
  },
});

export const {
  setTaskLists,
  addTaskList,
  updateTaskList,
  switchTaskListEditMode,
  deleteTaskList,
  addTask,
  toggleCollapseTask,
  switchTaskEditMode,
  updateTask,
  setTasks,
  deleteTask,
  toggleCollapseAllTasks,
  deleteTaskLists,
} = taskListSlice.actions;
