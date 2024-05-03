import ChatInputSection from "./ChatInputSection/ChatInputSection";
import MessagesSection from "./MessagesSection/MessagesSection";

type Props = {};
const ChatArea = (props: Props) => {
  return (
    <div className="flex-1 lg:flex-[0.5] max-h-full flex flex-col px-2 md:px-5 gap-2">
      <MessagesSection />
      <div className="flex gap-1 md:gap-5">
        <ChatInputSection />
      </div>
    </div>
  );
};
export default ChatArea;
