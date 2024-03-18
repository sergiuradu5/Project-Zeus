import { MdAdd } from "react-icons/md";
import Button from "../UI/Button";
import Icon from "../UI/Icon";

type AddListBoardProps = {};
const AddListBoard = (props: AddListBoardProps) => {
  return (
    <>
      <Button secondary className="hidden md:flex">
        Add New List Board
      </Button>
      <Icon IconName={MdAdd} className="block md:hidden" />
    </>
  );
};
export default AddListBoard;
