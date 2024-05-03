import { forwardRef } from "react";
import { UserType } from "../../../../types/user-type";
import UserLoader from "./UserLoader";

type UserAvatarProps = {
  user: UserType;
  loading?: boolean;
  onClick?: () => void;
};
const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, onClick, loading }, ref) => {
    return loading && user ? (
      <UserLoader />
    ) : (
      <div
        onClick={onClick}
        className="group transition-all hover:bg-gray-200 z-10 relative flex items-center gap-2 py-3 px-5 space-3 cursor-pointer border-b-[1px] border-gray-200"
        ref={ref}
      >
        <div className="z-10 relative flex-shrink-0">
          <img
            src={user.img}
            alt="User profile image"
            className="transition-all group-hover:ring-gray-400 w-11 h-11 rounded-full ring-2 p-[2px] hover:shadow-lg ring-gray-300"
          />

          <span
            className={`top-0 right-0 absolute h-3 w-3 border-2 rounded-full border-gray-800 ${
              user.isOnline ? "bg-green-400" : "bg-gray-300"
            } `}
          />
        </div>
        <div className="relative flex flex-col items-left">
          <div className="-mb-1">{user.username}</div>
          <div className="text-sm text-gray-400 group-hover:text-gray-500">
            Last seen on {user.lastSeen}
          </div>
        </div>
      </div>
    );
  }
);
export default UserAvatar;
