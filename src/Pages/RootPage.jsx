import Sidebar from "../Components/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LOCAL_TOKEN, LOGIN_ROUTE } from "../Constants";
import { ModalContext } from "../store/ModalContext";

export default function RootPage() {
  const context = useContext(ModalContext);
  const token = localStorage.getItem(LOCAL_TOKEN);
  const id = token ? JSON.parse(token) : null;
  const onSuccess = () => {
    return (
      <div className={context.isDarkMode ? "flex dark" : "flex"}>
        <Sidebar />
        <Outlet />
      </div>
    );
  };

  if (id) {
    return onSuccess();
  }
  return <Navigate to={LOGIN_ROUTE} replace />;
}
