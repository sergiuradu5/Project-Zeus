import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
} & ComponentPropsWithoutRef<"dialog">;

const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children, onClose, ...otherProps }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
      return {
        open: () => {
          if (dialog.current) dialog.current?.showModal();
        },
        close: () => {
          if (dialog.current) dialog.current?.close();
          onClose?.();
        },
      };
    });

    return createPortal(
      <dialog ref={dialog} onClose={onClose} {...otherProps}>
        {children}{" "}
      </dialog>,
      document.getElementById("modal-root")!
    );
  }
);
export default Modal;
