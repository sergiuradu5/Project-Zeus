import FlipMove from "react-flip-move";
import { TaskType } from "../../types/task-type";
import Task from "./Task";

type TasksProps = {
  taskListId: string;
  tasks: TaskType[];
};
const Tasks = ({ tasks, taskListId }: TasksProps) => {
  return (
    <div className="p-3 pb-5">
      <FlipMove>
        {tasks?.map((task) => {
          if (task)
            return <Task key={task.id} taskListId={taskListId} task={task} />;
        })}
      </FlipMove>
    </div>
  );
};
export default Tasks;
