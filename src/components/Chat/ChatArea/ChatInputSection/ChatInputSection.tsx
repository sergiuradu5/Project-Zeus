import { useState } from "react";
import {
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
  BsSendFill,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { BE_sendMessage } from "../../../../backend/messages-queries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { useEventEmit } from "../../../../hooks/use-event";
import { getStorageUser } from "../../../../local-storage/local-storage-functions";
import { setIsRightSideBarOpen } from "../../../../store/chats/chat-slice";
import Icon from "../../../UI/Icon";
import Input from "../../../UI/Input";

type Props = {};
const ChatInputSection = (props: Props) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const dispatch = useAppDispatch();
  const scrollDownToContainerInChatTrigger = useEventEmit(
    "scrollDownToContainerInChat"
  );
  const currentSelectedUser = useAppSelector(
    (state) => state.chat.currentSelectedUser
  );
  const currentSelectedChat = useAppSelector(
    (state) => state.chat.currentSelectedChat
  );

  function handleClickPeopleIcon() {
    dispatch(setIsRightSideBarOpen());
  }

  async function handleSendMessage() {
    const trimmedMessageInput = messageInput.trim();
    if (trimmedMessageInput.length === 0) {
      return;
    }

    const messageData = {
      senderId: getStorageUser()!.id,
      content: trimmedMessageInput,
    };
    if (currentSelectedChat) {
      await BE_sendMessage(
        currentSelectedChat.id!,
        messageData,
        setSendMessageLoading
      );
      scrollDownToContainerInChatTrigger();
      setMessageInput("");
    }
  }

  function handleEnterKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div className="flex flex-1 gap-1 md:gap-5">
      <div className="bg-white p-2 flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-gray-300">
        <Icon
          IconName={BsFillPeopleFill}
          className="text-gray-500 block md:hidden"
          reduceOpacityOnHover={false}
          size={15}
          onClick={handleClickPeopleIcon}
        />
        <Icon
          IconName={BsFillEmojiSunglassesFill}
          className="text-gray-500 hidden md:block"
          reduceOpacityOnHover={true}
        />
        <Input
          className="border-none outline-none text-sm md:text-[15px]"
          placeholder={
            currentSelectedUser?.id
              ? `Send message to ${currentSelectedUser.username}`
              : ""
          }
          value={messageInput}
          onChange={(e) => setMessageInput(e.currentTarget.value)}
          onKeyDown={handleEnterKeyDown}
        />
        <Icon
          IconName={ImAttachment}
          className="text-gray-500 hidden md:block rotate-90"
          reduceOpacityOnHover={true}
        />
        <Icon
          IconName={BsFillCameraFill}
          className="text-gray-500 hidden md:block"
          reduceOpacityOnHover={true}
        />
      </div>
      <div className="flex items-center justify-center">
        <Icon
          IconName={BsSendFill}
          className="text-gray-500 hidden md:block"
          reduceOpacityOnHover={false}
          onClick={handleSendMessage}
          disabled={sendMessageLoading}
        />
      </div>
    </div>
  );
};
export default ChatInputSection;
