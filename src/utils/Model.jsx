import { useRef, useEffect } from "react";
export default function Model({ children, isOpen }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      return dialogRef.current.showModal();
    }
    dialogRef.current.close();
  }, [isOpen]);
  return (
    <div className="modal" ref={dialogRef}>
      {children}
    </div>
  );
}
