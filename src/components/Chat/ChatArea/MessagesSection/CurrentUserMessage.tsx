type Props = { content: string };
const CurrentUserMessage = ({ content }: Props) => {
  return (
    <div
      className={`bg-gradient-to-r from-myBlue to-myPink text-white 
      ml-auto
  text-sm max-w-md shadow-md py-3 px-10 rounded-t-full rounded-bl-full border-2 border-white`}
      style={{ justifySelf: "flex-end" }}
    >
      {content}
    </div>
  );
};
export default CurrentUserMessage;
