import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { useNavigate } from "react-router";

import Modal from "../utils/Modal";
import { LOCAL_TOKEN, LOCAL_ADMIN, LOGIN_ROUTE } from "../Constants";

export default function LogoutModal({ isOpen, handelFunction }) {
  const navigate = useNavigate();
  function handelLogOut() {
    localStorage.removeItem(LOCAL_TOKEN);
    let admin = localStorage.getItem(LOCAL_ADMIN);
    if (admin) {
      localStorage.removeItem(LOCAL_ADMIN);
    }
    navigate(LOGIN_ROUTE);
    handelFunction("isLogout");
    toast.success("Logout Successfully");
  }

  return (
    <div>
      <Modal isOpen={isOpen} style="deleteModel modal p-5">
        <div>
          <div className="flex justify-between mb-2">
            <div className="flex gap-3 items-center">
              <CiWarning className=" text-orange-400 text-3xl font-bold" />
              <h3 className="font-bold text-xl">
                Are You Sure You Want to Logout ?
              </h3>
            </div>
            <button
              type="button"
              className="font-bold text-2xl"
              onClick={() => handelFunction("isLogout")}
            >
              <MdCancel />
            </button>
          </div>
          <p className="text-gray-400 mb-2">You will be Logout</p>
          <p className="flex gap-4 mb-1">
            <button
              className="bg-red-600 p-2 rounded-lg text-sm text-white"
              onClick={handelLogOut}
            >
              Logout
            </button>
            <button
              className="border-2 p-2 rounded-lg text-sm"
              onClick={() => handelFunction("isLogout")}
            >
              Stay In
            </button>
          </p>
        </div>
      </Modal>
    </div>
  );
}
