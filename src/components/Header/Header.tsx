import { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BE_signOut } from "../../backend/user-queries";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Icon from "../UI/Icon";
import Spinner from "../UI/Spinner";
import AddListBoard from "./AddListBoard";
import UserHeaderProfile from "./UserHeaderProfile";

type HeaderProps = {};
const Header = (props: HeaderProps) => {
  const hasNewMessage = useAppSelector((state) => state.chat.hasNewMessages);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const goTo = useNavigate();
  const { pathname } = useLocation();

  async function handleSignOut() {
    await BE_signOut(dispatch, setLoading, goTo);
  }

  const listPageComponents = pathname === "/dashboard" && (
    <>
      <AddListBoard />
      <Icon
        IconName={BsFillChatFill}
        to={"/dashboard/chat"}
        ping={hasNewMessage}
      />
    </>
  );

  const profilePageComponents = pathname === "/dashboard/profile" && (
    <>
      <Icon
        IconName={BsFillChatFill}
        to={"/dashboard/chat"}
        ping={hasNewMessage}
      />
      <Icon IconName={FiList} to={"/dashboard"}></Icon>
    </>
  );

  const chatPageComponents = pathname === "/dashboard/chat" && (
    <>
      <Icon IconName={FiList} to={"/dashboard"}></Icon>
    </>
  );

  return (
    <>
      <div className="z-20 flex flex-wrap sm:flex-row gap-3 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
        <img
          className="w-[50px] md:w-[80px] cursor-pointer"
          src={logo}
          alt="logo"
        />
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {listPageComponents}
          {profilePageComponents}
          {chatPageComponents}
          <div className="group relative">
            <UserHeaderProfile user={currentUser} />
            <div className="absolute right-0 md:left-0 pt-3 hidden group-hover:block w-full min-w-max">
              <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
                <Link
                  to="/dashboard/profile"
                  className="hover:bg-gray-200 py-2 px-4 block"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className={`flex flex-row w-full items-center gap-2 hover:bg-gray-200 py-2 px-4 ${
                    loading ? "cursor-wait" : ""
                  }`}
                >
                  Sign out
                  {loading && <Spinner className="border-myBlue" />}
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
