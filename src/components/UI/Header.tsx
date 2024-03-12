import reactLogo from "../../assets/react-logo-white.png";
import Button from "./Button";

type HeaderProps = {};
const Header = (props: HeaderProps) => {
  return (
    <>
      <div className="flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
        <img className="w-[80px] cursor-pointer" src={reactLogo} alt="logo" />
        <Button secondary>Add New List Board</Button>
      </div>
    </>
  );
};
export default Header;
