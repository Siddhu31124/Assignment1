import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../store/ModalContext";
export default function Sidebar() {
  const context = useContext(ModalContext);
  const location = useLocation();
  const path = location.pathname;
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
              Transaction
            </li>
          </NavLink>
        </ul>
      </div>
      <div>
        <button
          onClick={() => context.handelModel("logout")}
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
