import { useContext } from "react";
import Login from "../Components/Login";
import { ModalContext } from "../store/ModalContext";
export default function LoginPage() {
  const context = useContext(ModalContext);
  return (
    <div className={context.isDarkMode ? "dark" : ""}>
      <div className="dark:bg-black">
        <Login />
      </div>
    </div>
  );
}
