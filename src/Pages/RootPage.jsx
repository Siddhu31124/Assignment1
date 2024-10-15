import Sidebar from "../Components/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { LOCAL_TOKEN, INITIAL_ROUTE } from "../Constants";

export default function RootPage() {
  const token = localStorage.getItem(LOCAL_TOKEN);
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
  return <Navigate to={INITIAL_ROUTE} replace />;
}
