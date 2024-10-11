import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export default function RootPage() {
  const id = JSON.parse(localStorage.getItem("token"));

  return (
    <>
      {id ? (
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}
