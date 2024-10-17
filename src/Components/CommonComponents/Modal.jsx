import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import { useContext } from "react";
import { ModalContext } from "../../store/ModalContext";
export default function Modal({ children, isOpen, style }) {
  const context = useContext(ModalContext);
  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      return dialogRef.current.showModal();
    }
    dialogRef.current.close();
  }, [isOpen]);
  return createPortal(
    <>
      <div className={context.isDarkMode ? "dark" : ""}>
        <dialog className={style} ref={dialogRef}>
          {children}
        </dialog>
      </div>
    </>,
    document.getElementById("modal")
  );
}
