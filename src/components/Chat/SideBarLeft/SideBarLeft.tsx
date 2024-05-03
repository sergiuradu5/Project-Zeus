import { useEffect, useState } from "react";
import { BE_getAllUsers } from "../../../backend/user-queries";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { setIsChatTab } from "../../../store/chats/chat-slice";
import SideBar from "../../UI/SideBar";
import Chats from "./Chats/Chats";
import Users from "./Users/Users";

type SideBarLeftProps = {};
const SideBarLeft = (props: SideBarLeftProps) => {
  const isChatsTab = useAppSelector((state) => state.chat.isChatsTab);
  const isRightSideBarOpen = useAppSelector(
    (state) => state.chat.isRightSideBarOpen
  );
  const [usersLoading, setUsersLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleToggleChatsTab(value: boolean) {
    dispatch(setIsChatTab(value));
  }

  useEffect(() => {
    const getAllUsers = async () => {
      await BE_getAllUsers(dispatch, setUsersLoading);
    };
    getAllUsers();
  }, [dispatch, setUsersLoading]);

  return (
    <SideBar
      position={"left"}
      className={`flex-[0.8] md:flex-[0.5] absolute md:relative z-10 md:z-0
      w-[80%] h-[80%] md:h-full md:w-full overflow-x-hidden overflow-y-hidden
      ${
        isRightSideBarOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex flex-col relative">
        <div className="flex top-0 z-10">
          <p
            onClick={() => handleToggleChatsTab(true)}
            className={`transition-all p-5 flex-1 text-center font-bold cursor-pointer
            ${
              isChatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            Chats
          </p>
          <p
            onClick={() => handleToggleChatsTab(false)}
            className={`transition-all p-5 flex-1 text-center font-bold cursor-pointer
            ${
              !isChatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }
            `}
          >
            Users
          </p>
        </div>
      </div>
      <div className="h-[90%] flex-1 overflow-y-auto mx-0 px-0">
        <div className="flex flex-1 flex-col">
          {isChatsTab ? <Chats /> : <Users loading={usersLoading} />}
        </div>
      </div>
    </SideBar>
  );
};
export default SideBarLeft;
