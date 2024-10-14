import Sidebar from "../Components/Sidebar";
import { Outlet, Navigate } from "react-router-dom";

export default function RootPage() {
  const token = localStorage.getItem("token");
  const id = token ? JSON.parse(token) : null;
  const onSuccess = () => {
    return (
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    );
  };

  if (id) {
    return onSuccess();
  }
  return <Navigate to="/login" replace />;
}
