import { useEffect, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import { currentUserIsSender } from "../../../../backend/chat-queries";
import { BE_getMessages } from "../../../../backend/messages-queries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { useEventRegister } from "../../../../hooks/use-event";
import Message from "./Message";
import MessageLoaders from "./MessageLoaders";
import NoMessagesYet from "./NoMessagesYet";

type Props = {};
const MessagesSection = (props: Props) => {
  const dispatch = useAppDispatch();
  const currentMessages = useAppSelector((state) => state.chat.currentMessages);
  const [getMessagesLoading, setGetMessagesLoading] = useState(false);
  const scrollDownContainer = useRef<HTMLDivElement>(undefined);
  const currentSelectedChat = useAppSelector(
    (state) => state.chat.currentSelectedChat
  );

  useEventRegister("scrollDownToContainerInChat", {
    next: () => {
      if (scrollDownContainer)
        scrollDownContainer.current.scrollIntoView({ behavior: "smooth" });
    },
    error: () => {},
  });

  useEffect(() => {
    if (currentSelectedChat?.id) {
      BE_getMessages(dispatch, currentSelectedChat.id, setGetMessagesLoading);
    }
  }, [currentSelectedChat]);

  return (
    <div className="flex-1 flex flex-col max-h-screen overflow-y-scroll shadow-inner gap-2">
      {getMessagesLoading ? (
        <MessageLoaders />
      ) : currentMessages.length > 0 ? (
        <>
          <FlipMove className="flex flex-col flex-1">
            {currentMessages.map((message) => (
              <Message
                key={message.id}
                isCurrentUsersMessage={currentUserIsSender(message.senderId)}
                content={message.content}
              />
            ))}
          </FlipMove>
          {/* Container to scroll down to after sending a message */}
          <div ref={scrollDownContainer} className="pb-30 flex invisible"></div>
        </>
      ) : (
        <NoMessagesYet />
      )}
    </div>
  );
};
export default MessagesSection;
