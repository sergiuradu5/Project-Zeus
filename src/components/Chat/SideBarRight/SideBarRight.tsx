import { useAppSelector } from "../../../hooks/redux-hooks";
import SideBar from "../../UI/SideBar";

const SideBarRight = () => {
  const currentSelectedUser = useAppSelector(
    (state) => state.chat.currentSelectedUser
  );

  return (
    <SideBar position="right" className="hidden lg:block overflow-x-hidden">
      <div className="flex flex-col">
        <div className="bg-gray-200 h-16 sticky top-0 flex items-center justify-center">
          {currentSelectedUser?.username && (
            <p className="font-bold">{currentSelectedUser?.username}</p>
          )}
        </div>
        <div className="p-10 flex flex-col gap-10">
          <div className="relative self-center">
            <img
              className="w-32 h-32 md:h-48 md:w-48 rounded-full p-[2px] ring-2 ring-gray-200 cursor-pointer hover:shadow-lg"
              src={currentSelectedUser?.img}
              alt={currentSelectedUser?.username}
            />
            <span
              className={`absolute top-2 right-0 md:right-4 md:top-3 w-6 h-6 border-2 border-gray-800 rounded-full ${
                currentSelectedUser?.isOnline ? "bg-green-400" : "bg-gray-300"
              }`}
            ></span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-400">
              Username:{" "}
              <span className="text-gray-800">
                {currentSelectedUser?.username}
              </span>
            </p>
            <hr />
            <p className="text-gray-400">
              Email:{" "}
              <span className="text-gray-800">
                {currentSelectedUser?.email}
              </span>
            </p>

            <p className="text-gray-400">
              Last seen at:{" "}
              <span className="text-gray-800">
                {currentSelectedUser?.lastSeen}
              </span>
            </p>

            <p className="text-gray-400">
              Joined at:{" "}
              <span className="text-gray-800">
                {currentSelectedUser?.creationTime}
              </span>
            </p>

            <p className="text-gray-400">
              Bio:{" "}
              <span className="text-gray-800">{currentSelectedUser?.bio}</span>
            </p>
          </div>
        </div>
      </div>
    </SideBar>
  );
};
export default SideBarRight;
