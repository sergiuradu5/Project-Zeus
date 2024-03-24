import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { BE_addTaskList } from "../../backend/task-list-queries";
import { useAppDispatch } from "../../hooks/redux-hooks";
import Button from "../UI/Button";
import Icon from "../UI/Icon";

type AddListBoardProps = {};
const AddListBoard = (props: AddListBoardProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddList() {
    BE_addTaskList(dispatch, setLoading);
  }

  return (
    <>
      <Button
        onClick={handleAddList}
        loading={loading}
        className="hidden md:flex"
      >
        Add New List Board
      </Button>
      <Icon
        onClick={handleAddList}
        loading={loading}
        IconName={MdAdd}
        className="block md:hidden"
      />
    </>
  );
};
export default AddListBoard;
