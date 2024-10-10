import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function RootPage() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [id, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
