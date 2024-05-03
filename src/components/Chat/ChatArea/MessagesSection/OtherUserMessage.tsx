type Props = { content: string };
const OtherUserMessage = ({ content }: Props) => {
  return (
    <div
      className={`bg-gray-300
      mr-auto
      text-sm max-w-md shadow-md py-3 px-10 rounded-t-full rounded-br-full border-2 border-white`}
    >
      {content}
    </div>
  );
};
export default OtherUserMessage;
