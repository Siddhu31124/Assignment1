import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AddModal from "./AddModal";
import { useContext } from "react";
import { ModalContext } from "../store/ModalContext";
import { TRANSACTION_ROUTE } from "../Constants";
export default function TransactionHeader() {
  const context = useContext(ModalContext);
  const location = useLocation();
  const path = location.pathname;
  const isActivePathStyle = ({ isActive }) => (isActive ? "text-blue-500" : "");
  let style;
  if (path === TRANSACTION_ROUTE) {
    style = "active_indicator_all";
  } else if (path === `${TRANSACTION_ROUTE}/credit`) {
    style = "active_indicator_credit";
  } else {
    style = "active_indicator_debit";
  }
  return (
    <>
      <AddModal />
      <div className={style}></div>
      <nav>
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
