import SingleTaskListLoader from "./SingleTaskListLoader";

const ListPageLoader = () => {
  const numberOfSingleTaskListLoaders = 3;
  const range = [...Array(numberOfSingleTaskListLoaders).keys()];

  return range.map((value) => <SingleTaskListLoader key={value} />);
};

export default ListPageLoader;
