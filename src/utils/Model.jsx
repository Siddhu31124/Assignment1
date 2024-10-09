import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
export default function Model({ children, isOpen }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      return dialogRef.current.showModal();
    }
    dialogRef.current.close();
  }, [isOpen]);
  return createPortal(
    <>
      <dialog className="modal p-5" ref={dialogRef}>
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
