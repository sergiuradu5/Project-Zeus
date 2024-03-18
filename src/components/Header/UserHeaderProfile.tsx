import { UserType } from "../../types/user-type";

type UserHeaderProfileProps = {
  user: UserType;
  onClick?: () => void;
};
const UserHeaderProfile = ({ user, onClick }: UserHeaderProfileProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center space-x-3 cursor-pointer"
    >
      <div className="relative">
        <img
          src={user.img}
          alt="User profile image"
          className="w-11 h-11 rounded-full ring-2 ring-white p-[2px]"
        />
        <span className="top-0 right-0 absolute h-3 w-3 border-2 rounded-full border-gray-800 bg-green-400" />
      </div>
      <div className="relative flex flex-col items-left">
        <div className="-mb-1">{user.username}</div>
        <div className="text-sm text-gray-300">Joined {user.creationTime}</div>
      </div>
    </div>
  );
};
export default UserHeaderProfile;
