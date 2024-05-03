import { useEffect, useRef } from "react";
import Button from "../../../UI/Button";
import Modal, { ModalHandle } from "../../../UI/Modal";

type StartChattingWithUserModalProps = {
  username: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};
const StartChattingWithUserModal = ({
  username,
  onClose,
  onConfirm,
  loading,
}: StartChattingWithUserModalProps) => {
  const modalRef = useRef<ModalHandle>(null);
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, []);

  return (
    <Modal
      ref={modalRef}
      onClose={onClose}
      dialogClassName="bg-white rounded-xl shadow-md"
      contentClassName="flex flex-col gap-5 
     max-w-xl rounded-xl py-5 px-6 md:py-10 md:px-14 md:m-auto text-center"
    >
      <div className="flex-1 text-center">
        Start chatting with user {username}?
      </div>
      <div className="flex justify-center flex-row gap-1">
        <Button secondary onClick={onClose}>
          Close
        </Button>
        <Button loading={loading} onClick={onConfirm}>
          Sure
        </Button>
      </div>
    </Modal>
  );
};
export default StartChattingWithUserModal;
