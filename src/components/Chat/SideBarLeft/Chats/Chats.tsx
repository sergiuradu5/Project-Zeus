import FlipMove from "react-flip-move";
import { currentUserIsSender } from "../../../../backend/chat-queries";
import { useAppSelector } from "../../../../hooks/redux-hooks";
import ChatsProfile from "./ChatsProfile";

type ChatsProps = {};
const Chats = ({}: ChatsProps) => {
  const chats = useAppSelector((state) => state.chat.chats);

  return (
    <div>
      <FlipMove className="flex flex-col">
        {chats.map((c) => (
          <ChatsProfile
            key={c.id}
            chat={c}
            userId={currentUserIsSender(c.senderId) ? c.receiverId : c.senderId}
          />
        ))}
      </FlipMove>
    </div>
  );
};
export default Chats;
