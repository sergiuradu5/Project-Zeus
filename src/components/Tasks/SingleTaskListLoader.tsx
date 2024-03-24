type Props = {};
const SingleTaskListLoader = (props: Props) => {
  return (
    <div className="bg-gray-200 w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px]">
      <div className="animate-pulse flex flex-col">
        <div className="h-14 bg-gray-300 rounded-t-md"></div>
        <div className="flex-1 space-y-3 p-10"></div>
      </div>
      <div className="absolute animate-pulse -bottom-4 -left-4 bg-gray-300 w-10 h-10 rounded-full"></div>
    </div>
  );
};
export default SingleTaskListLoader;
