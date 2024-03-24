import { TaskType } from "./task-type";

export type TaskListType = {
  id?: string;
  title: string;
  editMode?: boolean;
  tasks?: TaskType[];
};
