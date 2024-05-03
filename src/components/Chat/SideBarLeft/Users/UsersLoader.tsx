import UserLoader from "./UserLoader";

const UsersLoader = () => {
  const numberOfUserLoaders = 10;
  const range = [...Array(numberOfUserLoaders).keys()];
  return (
    <div className="flex flex-col">
      {range.map((num) => {
        return <UserLoader key={num} />;
      })}
    </div>
  );
};
export default UsersLoader;
