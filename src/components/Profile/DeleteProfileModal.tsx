import { useEffect, useRef } from "react";
import Button from "../UI/Button";
import Modal, { ModalHandle } from "../UI/Modal";

type DeleteProfileModalProps = {
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const DeleteProfileModal = ({
  loading,
  onClose,
  onConfirm,
}: DeleteProfileModalProps) => {
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
    shadow-md max-w-xl rounded-xl py-5 px-6 md:py-10 md:px-14 md:m-auto text-center"
    >
      Are you sure you want to delete user profile?
      <div className="flex gap-1">
        <Button loading={loading} secondary onClick={onConfirm}>
          Yes, Delete Profile
        </Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};
export default DeleteProfileModal;
