import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useContext } from "react";
import { MdOutlineLightMode } from "react-icons/md";

import { ModalContext } from "../store/ModalContext";
import { INITIAL_ROUTE, TRANSACTION_ROUTE } from "../Constants";
import { mobileMenuStyle, mobileAddButton } from "../utils/Styles";

const mobileNavBar = () => {
  const context = useContext(ModalContext);

  function handelLogoutMenu() {
    context.handelOpenMenu();
    context.handelOpenModal("isLogout");
  }

  const menuElements = () => {
    if (context.isOpenMenu) {
      return (
        <div className=" p-6 absolute bg-slate-100 w-screen top-16 dark:bg-black">
          <ul className="menu flex flex-col gap-4 ">
            <NavLink to={INITIAL_ROUTE} end>
              <li onClick={context.handelOpenMenu}>Dashboard</li>
            </NavLink>
            <NavLink to={TRANSACTION_ROUTE} end>
              <li onClick={context.handelOpenMenu}>All Transaction</li>
            </NavLink>
            <li className="cursor-pointer" onClick={handelLogoutMenu}>
              Logout
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col dark:bg-black dark:text-white">
      <div className={mobileMenuStyle}>
        <div className="flex gap-4">
          <RxHamburgerMenu
            className="text-black text-2xl dark:text-white cursor-pointer"
            onClick={context.handelOpenMenu}
          />
          <img src="Logo.png" />
        </div>
        <p className="flex gap-2 items-center">
          <button
            onClick={() => context.handelOpenModal("isAdd")}
            className={mobileAddButton}
          >
            ADD
          </button>
          <button className="text-2xl" onClick={context.handelDarkMode}>
            <MdOutlineLightMode />
          </button>
        </p>
      </div>
      {menuElements()}
    </div>
  );
};

export default mobileNavBar;
