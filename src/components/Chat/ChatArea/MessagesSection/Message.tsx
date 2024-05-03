import { forwardRef } from "react";
import CurrentUserMessage from "./CurrentUserMessage";
import OtherUserMessage from "./OtherUserMessage";

type Props = {
  isCurrentUsersMessage: boolean;
  content: string;
};
const Message = forwardRef<HTMLDivElement, Props>(
  ({ isCurrentUsersMessage, content }, ref) => {
    return (
      <span ref={ref} className="flex">
        {isCurrentUsersMessage ? (
          <CurrentUserMessage content={content} />
        ) : (
          <OtherUserMessage content={content} />
        )}
      </span>
    );
  }
);
export default Message;
