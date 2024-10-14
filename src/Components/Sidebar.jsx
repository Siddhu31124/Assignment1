import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../store/ModalContext";
import { IoIosLogOut } from "react-icons/io";
export default function Sidebar() {
  const context = useContext(ModalContext);
  const location = useLocation();
  const path = location.pathname;
  const isAdmin = localStorage.getItem("admin");
  const email = localStorage.getItem("userDetails");
  const name = email.split("@")[0];
  return (
    <aside className="sidebar">
      {path === "/" ? (
        <div className="active_indicator_dashboard">i</div>
      ) : (
        <div className="active_indicator_transaction">i</div>
      )}
      <div>
        <img src="Logo.png" />
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li className="font-bold flex items-center">
              <IoHome className="mr-2" />
              Dashboard
            </li>
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li className="font-bold flex items-center">
              <GrTransaction className="mr-2" />
              {isAdmin ? "All Transaction" : "Transaction"}
            </li>
          </NavLink>
        </ul>
      </div>

      <div className="flex flex-col content-between">
        <div className="flex gap-20 items-center">
          <p>{name.toUpperCase()}</p>
          <button onClick={() => context.handelModel("logout")}>
            <IoIosLogOut className="font-bolder text-gray-400 text-2xl" />
          </button>
        </div>
        <p className="text-blue-600 font-light">{email}</p>
      </div>
    </aside>
  );
}
