import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
  contentClassName?: string;
  dialogClassName?: string;
};

const Modal = forwardRef<ModalHandle, ModalProps>(
  (
    { children, onClose, contentClassName, dialogClassName, ...otherProps },
    ref
  ) => {
    const dialog = useRef<HTMLDialogElement>(null);

    function handleOnClick(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
      if (e.currentTarget === e.target) {
        onClose?.();
      }
    }

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
      <>
        <dialog
          ref={dialog}
          onClick={handleOnClick}
          {...otherProps}
          className={dialogClassName}
        >
          <div className={`z-50 ${contentClassName}`}>{children}</div>
        </dialog>
        <div className="absolute z-50 backdrop-blur-[2px] bg-black bg-opacity-30 h-full w-full"></div>
      </>,
      document.getElementById("modal-root")!
    );
  }
);
export default Modal;
