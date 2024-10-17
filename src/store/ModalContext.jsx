import { createContext } from "react";
import { useState } from "react";

export const ModalContext = createContext();

export function ContextProvider({ children }) {
  const [isDarkMode, selIsDarkMode] = useState(false);
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

  function handelDarkMode() {
    selIsDarkMode((preVal) => !preVal);
  }

  const contextStore = {
    ModalStates,
    selectedData,
    handelOpenModal,
    handelCloseModal,
    isDarkMode,
    handelDarkMode,
  };

  return (
    <ModalContext.Provider value={contextStore}>
      {children}
    </ModalContext.Provider>
  );
}
