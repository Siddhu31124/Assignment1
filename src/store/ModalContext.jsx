import { createContext } from "react";
import { useState } from "react";
export const ModalContext = createContext({
  openModal: "",
  selectedData: "",
  handelModel: "",
});
export function ModalContextComponent({ children }) {
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState({
    isDelete: false,
    isAdd: false,
    isEdit: false,
    isLogout: false,
  });
  function handelModel(item, data) {
    if (data) {
      setSelectedData(data);
    }
    let identifier = item;
    setOpenModal((prevVal) => {
      return { ...prevVal, [identifier]: !prevVal[identifier] };
    });
  }
  const contextStore = { openModal, selectedData, handelModel };
  return (
    <ModalContext.Provider value={contextStore}>
      {children}
    </ModalContext.Provider>
  );
}
