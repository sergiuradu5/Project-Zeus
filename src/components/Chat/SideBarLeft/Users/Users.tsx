import { useState } from "react";
import FlipMove from "react-flip-move";
import { BE_startChat } from "../../../../backend/chat-queries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { UserType } from "../../../../types/user-type";
import StartChattingWithUserModal from "./StartChattingWithUserModal";
import UserAvatar from "./UserAvatar";
import UsersLoader from "./UsersLoader";

type UsersProps = {
  loading: boolean;
};
const Users = ({ loading }: UsersProps) => {
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(true);
  const [userClickedOn, setUserClickedOn] = useState<UserType | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  function handleShowModal(userClickedOn: UserType) {
    setShowModal(true);
    setUserClickedOn(userClickedOn);
  }

  function handleCloseModal() {
    setShowModal(false);
    setUserClickedOn(null);
  }

  function handleStartChatting() {
    if (userClickedOn?.id) {
      BE_startChat(userClickedOn.id, dispatch, setChatLoading);
    }
  }

  return loading ? (
    <UsersLoader />
  ) : (
    <div>
      {showModal && userClickedOn && (
        <StartChattingWithUserModal
          username={userClickedOn.username}
          onClose={handleCloseModal}
          onConfirm={handleStartChatting}
          loading={chatLoading}
        />
      )}
      <FlipMove className="flex flex-col">
        {users.map((u) => (
          <UserAvatar key={u.id} user={u} onClick={() => handleShowModal(u)} />
        ))}
      </FlipMove>
    </div>
  );
};
export default Users;
