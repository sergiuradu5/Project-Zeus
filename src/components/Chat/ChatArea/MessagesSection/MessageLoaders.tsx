import MessageLoader from "./MessageLoader";

const MessageLoaders = () => {
  const numberOfMessageLoaders = 6;
  const range = [...Array(numberOfMessageLoaders).keys()];
  return (
    <>
      {range.map((nr) => {
        return <MessageLoader key={nr} isCurrentUserMessage={nr % 2 === 0} />;
      })}
    </>
  );
};
export default MessageLoaders;
