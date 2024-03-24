import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { BE_getTaskLists } from "../backend/task-list-queries";
import ListPageLoader from "../components/Tasks/ListPageLoader";
import SingleTaskList from "../components/Tasks/SingleTaskList";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

type ListPageProps = {};
const ListPage = (props: ListPageProps) => {
  const taskLists = useAppSelector((state) => state.taskList.taskLists);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (taskLists.length === 0) {
      BE_getTaskLists(dispatch, setLoading);
    }
  }, []);

  const renderContent = loading ? (
    <div className="flex flex-wrap gap-10 justify-center">
      <ListPageLoader />
    </div>
  ) : taskLists.length === 0 && loading === false ? (
    <h1 className="text-3xl text-center text-gray-500 mt-10">
      No task lists added
    </h1>
  ) : (
    <FlipMove className="flex flex-wrap gap-10 justify-center">
      {taskLists?.map((taskList) => (
        <SingleTaskList key={taskList.id} {...taskList} />
      ))}
    </FlipMove>
  );

  return <div className="p-10">{renderContent}</div>;
};
export default ListPage;
