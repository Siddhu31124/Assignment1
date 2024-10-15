import { createContext } from "react";
import { useState } from "react";

export const ModalContext = createContext();

export function ContextProvider({ children }) {
  const [selectedData, setSelectedData] = useState();
  const [ModalStates, setModalState] = useState({
    isDelete: false,
    isAdd: false,
    isEdit: false,
    isLogout: false,
  });
  function handelOpenModal(typeOfModal, data) {
    if (data) {
      setSelectedData(data);
    }
    setModalState((prevVal) => {
      return { ...prevVal, [typeOfModal]: true };
    });
  }
  function handelCloseModal(typeOfModal) {
    setModalState((prevVal) => {
      return { ...prevVal, [typeOfModal]: false };
    });
  }
  const contextStore = {
    ModalStates,
    selectedData,
    handelOpenModal,
    handelCloseModal,
  };
  return (
    <ModalContext.Provider value={contextStore}>
      {children}
    </ModalContext.Provider>
  );
}
