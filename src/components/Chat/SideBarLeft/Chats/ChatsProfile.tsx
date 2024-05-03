import { forwardRef, useEffect, useState } from "react";
import { currentUserIsSender } from "../../../../backend/chat-queries";
import { getUserInfo } from "../../../../backend/user-queries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import {
  setCurrentSelectedChat,
  setCurrentSelectedUser,
  setIsRightSideBarOpen,
} from "../../../../store/chats/chat-slice";
import { ChatType } from "../../../../types/chat-type";
import { UserType } from "../../../../types/user-type";
import ChatAvatar from "./ChatAvatar";

type ChatsProfileProps = { userId?: string; chat: ChatType };
const ChatsProfile = forwardRef<HTMLDivElement, ChatsProfileProps>(
  ({ userId, chat }, ref) => {
    const {
      id,
      lastMessage,
      senderId,
      senderToReceiverNewMsgCount,
      receiverId,
      receiverToSenderNewMsgCount,
    } = chat;
    const dispatch = useAppDispatch();
    const isSelected = useAppSelector(
      (state) => state.chat.currentSelectedChat?.id === id
    );
    const [userLoading, setUserLoading] = useState(false);
    const [user, setUser] = useState<UserType | undefined>(undefined);

    function handleSelectChat() {
      dispatch(setCurrentSelectedChat(chat));
      if (user) {
        dispatch(setCurrentSelectedUser(user));
      }
      dispatch(setIsRightSideBarOpen(false));
    }

    useEffect(() => {
      const getUserInfoAsync = async () => {
        if (userId) {
          const user = await getUserInfo(userId, setUserLoading);
          setUser(user);
        }
      };
      getUserInfoAsync();
    }, [userId]);

    return (
      <div ref={ref}>
        <ChatAvatar
          loading={userLoading === true}
          user={user}
          onClick={handleSelectChat}
          lastMessage={lastMessage}
          currentUserIsSender={currentUserIsSender(senderId)}
          isSelected={isSelected}
          newMessageCount={
            currentUserIsSender(senderId)
              ? receiverToSenderNewMsgCount
              : senderToReceiverNewMsgCount
          }
        />
      </div>
    );
  }
);
export default ChatsProfile;
