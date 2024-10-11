import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import AddModal from "./AddModal";
export default function TransactionHeader() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  const path = location.pathname;
  let style;
  function handelModel(item) {
    let identifier = item;
    setOpenModal((prevVal) => {
      return { ...prevVal, [identifier]: !prevVal[identifier] };
    });
  }
  if (path === "/transaction") {
    style = "active_indicator_all";
  } else if (path === "/transaction/credit") {
    style = "active_indicator_credit";
  } else {
    style = "active_indicator_debit";
  }
  console.log(style);
  return (
    <>
      <AddModal
        isOpen={openModal.add}
        handelFunction={handelModel}
        type="add"
      />
      <div className={style}></div>
      <nav>
        <div>
          <h3 className="text-2xl font-bold">Transactions</h3>
          <ul className="transaction_ul">
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
              <li>Credit</li>
            </NavLink>
            <NavLink
              to="/transaction/debit"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              <li>Debit</li>
            </NavLink>
          </ul>
        </div>
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={() => handelModel("add")}
        >
          + Add Transactions
        </button>
      </nav>
    </>
  );
}
