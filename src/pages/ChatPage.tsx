import NoChatImage from "../assets/nochat.jpg";
import ChatArea from "../components/Chat/ChatArea/ChatArea";
import SideBarLeft from "../components/Chat/SideBarLeft/SideBarLeft";
import SideBarRight from "../components/Chat/SideBarRight/SideBarRight";
import { useAppSelector } from "../hooks/redux-hooks";
const ChatPage = () => {
  const currentSelectedChat = useAppSelector(
    (state) => state.chat.currentSelectedChat
  );

  const noChatSelectedContent = (
    <div className="hidden lg:block flex-[0.7] bg-white rounded-r-3xl shadow-md overflow-hidden">
      <img
        src={NoChatImage}
        alt="no chat found"
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <div className="h-full max-w-[1500px] flex justify-between m-auto p-3 ">
      <SideBarLeft />
      {currentSelectedChat?.id ? (
        <>
          <ChatArea />
          <SideBarRight />
        </>
      ) : (
        noChatSelectedContent
      )}
    </div>
  );
};
export default ChatPage;
