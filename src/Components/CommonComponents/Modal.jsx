import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
export default function Modal({ children, isOpen, style }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      return dialogRef.current.showModal();
    }
    dialogRef.current.close();
  }, [isOpen]);
  return createPortal(
    <>
      <dialog className={style} ref={dialogRef}>
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
