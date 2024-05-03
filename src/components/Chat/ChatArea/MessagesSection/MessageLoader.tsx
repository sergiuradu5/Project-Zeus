type Props = {
  isCurrentUserMessage: boolean;
};
const MessageLoader = ({ isCurrentUserMessage }: Props) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 text-white h-[40px] w-[120px]
max-w-md shadow-md py-3 px-10 rounded-t-full border-2 border-white
${
  isCurrentUserMessage
    ? "self-end rounded-bl-full"
    : "self-start rounded-br-full"
}
`}
    ></div>
  );
};
export default MessageLoader;
