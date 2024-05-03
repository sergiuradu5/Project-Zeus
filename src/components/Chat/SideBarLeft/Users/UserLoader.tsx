const UserLoader = () => {
  return (
    <div className="animate-pulse flex gap-2 items-center px-5 py-3 border-b-[1px] border-gray-200">
      <div className="w-11 h-11 rounded-full bg-gray-200"></div>
      <div className="flex flex-col gap-2 w-[70%]">
        <div className="bg-gray-300 h-2 rounded-md"></div>
        <div className="bg-gray-300 h-2 rounded-md"></div>
      </div>
    </div>
  );
};
export default UserLoader;
