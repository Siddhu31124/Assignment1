import { NavLink } from "react-router-dom";
import { useState } from "react";
import AddModel from "./AddTranscation";
export default function TrancationHeader() {
  const [openModal, setOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  function handelModel(item) {
    let identifier = item;
    setOpenModal((prevVal) => {
      return { ...prevVal, [identifier]: !prevVal[identifier] };
    });
  }
  return (
    <>
      <AddModel
        isOpen={openModal.add}
        handelFunction={handelModel}
        type="add"
      />
      <nav>
        <div>
          <h3 className="text-2xl font-bold">Transcation</h3>
          <ul className="transationUl">
            <NavLink
              to="/transaction"
              end
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <li>All Transaction</li>
            </NavLink>
            <NavLink
              to="/transaction/credit"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <li></li>Credit
            </NavLink>
            <NavLink
              to="/transaction/debit"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <li></li>Debit
            </NavLink>
          </ul>
        </div>
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={() => handelModel("add")}
        >
          + Add Trancations
        </button>
      </nav>
    </>
  );
}
