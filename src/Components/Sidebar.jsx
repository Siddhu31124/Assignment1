import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  function handelLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <aside className="sidebar">
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
          onClick={handelLogout}
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
