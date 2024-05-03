import { forwardRef } from "react";
import { UserType } from "../../../../types/user-type";
import { trimText } from "../../../../utils/trim-text-and-add-three-dots";
import UserLoader from "../Users/UserLoader";

type ChatAvatarProps = {
  user?: UserType;
  loading?: boolean;
  onClick?: () => void;
  lastMessage?: string;
  isSelected?: boolean;
  currentUserIsSender: boolean;
  newMessageCount?: string;
};
const ChatAvatar = forwardRef<HTMLDivElement, ChatAvatarProps>(
  (
    {
      user,
      onClick,
      loading,
      lastMessage,
      currentUserIsSender,
      isSelected,
      newMessageCount,
    },
    ref
  ) => {
    return !loading && user ? (
      <div
        onClick={onClick}
        className={`group transition-all hover:bg-gray-200 z-10 relative flex items-center gap-2 py-3 px-5 space-3 cursor-pointer border-b-[1px] border-gray-200
        ${isSelected && "bg-gray-200"}`}
        ref={ref}
      >
        <div className="z-10 relative flex-shrink-0">
          <img
            src={user.img}
            alt="User profile image"
            className={`transition-all group-hover:ring-gray-400 w-11 h-11 rounded-full ring-2 p-[2px] hover:shadow-lg ring-gray-300 ${
              isSelected && "ring-gray-400 shadow-lg"
            }`}
          />

          <span
            className={`top-0 right-0 absolute h-3 w-3 border-2 rounded-full border-gray-800 ${
              user.isOnline ? "bg-green-400" : "bg-gray-300"
            } `}
          />
        </div>
        <div className="relative flex flex-col items-left">
          <div className="-mb-1 flex items-center gap-1">
            {user.username}
            {newMessageCount && +newMessageCount > 0 ? (
              <p className="flex bg-myPink rounded-full text-white p-2 text-center h-6 w-auto items-center justify-center">
                {newMessageCount}
              </p>
            ) : null}
          </div>
          <div
            className={`text-sm text-gray-400 group-hover:text-gray-500 ${
              isSelected && "text-gray-500"
            }`}
          >
            <span>{lastMessage && trimText(lastMessage)}</span>
            {!lastMessage && <strong>No messages yet</strong>}
          </div>
        </div>
      </div>
    ) : (
      <UserLoader />
    );
  }
);
export default ChatAvatar;
