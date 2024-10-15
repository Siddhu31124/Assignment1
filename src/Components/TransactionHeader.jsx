import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

import AddModal from "./AddModal";
import { ModalContext } from "../store/ModalContext";
import { TRANSACTION_ROUTE, CREDIT_ROUTE } from "../Constants";

export default function TransactionHeader() {
  const context = useContext(ModalContext);
  const location = useLocation();
  const path = location.pathname;

  const isActivePathStyle = ({ isActive }) => (isActive ? "text-blue-500" : "");

  const styleFunction = () => {
    switch (true) {
      case path === TRANSACTION_ROUTE:
        return "active_indicator_all";
      case path === CREDIT_ROUTE:
        return "active_indicator_credit";
      default:
        return "active_indicator_debit";
    }
  };

  const navbarElements = () => {
    return (
      <div>
        <h3 className="text-2xl font-bold">Transactions</h3>
        <ul className="transaction_ul">
          <NavLink to="/transaction" end className={isActivePathStyle}>
            <li>All Transaction</li>
          </NavLink>
          <NavLink to="/transaction/credit" className={isActivePathStyle}>
            <li>Credit</li>
          </NavLink>
          <NavLink to="/transaction/debit" className={isActivePathStyle}>
            <li>Debit</li>
          </NavLink>
        </ul>
      </div>
    );
  };

  return (
    <>
      <AddModal />
      <div className={styleFunction()}></div>
      <nav>
        {navbarElements()}
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={() => context.handelOpenModal("isAdd")}
        >
          + Add Transactions
        </button>
      </nav>
    </>
  );
}
