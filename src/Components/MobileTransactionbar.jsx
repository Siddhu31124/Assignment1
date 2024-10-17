import { NavLink } from "react-router-dom";
import { TRANSACTION_ROUTE, CREDIT_ROUTE, DEBIT_ROUTE } from "../Constants";

export default function MobileTransaction() {
  const isActivePathStyle = ({ isActive }) => (isActive ? "text-blue-500" : "");
  const navbarElements = () => {
    return (
      <div className="h-10 ">
        <ul className="flex gap-2 justify-center pt-3">
          <NavLink to={TRANSACTION_ROUTE} className={isActivePathStyle} end>
            <li>All Transaction</li>
          </NavLink>
          <NavLink to={CREDIT_ROUTE} className={isActivePathStyle}>
            <li>Credit</li>
          </NavLink>
          <NavLink to={DEBIT_ROUTE} className={isActivePathStyle}>
            <li>Debit</li>
          </NavLink>
        </ul>
      </div>
    );
  };
  return (
    <div className="lg:hidden bg-slate-100 dark:bg-black dark:text-white">
      {navbarElements()}
    </div>
  );
}
