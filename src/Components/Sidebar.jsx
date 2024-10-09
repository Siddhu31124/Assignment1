import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <img src="Logo.png" />
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-blue-600" : "")}
        >
          <li className="font-bold flex items-center">
            <IoHome className="mr-2" />
            Dashboard
          </li>
        </NavLink>
        <NavLink
          to="/transaction"
          className={({ isActive }) => (isActive ? "text-blue-600" : "")}
        >
          <li className="font-bold flex items-center">
            <GrTransaction className="mr-2" />
            Transaction
          </li>
        </NavLink>
      </ul>
    </aside>
  );
}
