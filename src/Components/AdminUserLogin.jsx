import React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { handelLogin } from "../http";
import Input from "./CommonComponents/Input";
import Loader from "./CommonComponents/Loader";
import {
  INITIAL_ROUTE,
  LOCAL_TOKEN,
  LOGIN_ROUTE,
  LOGIN_ERROR,
  ADMIN_LOGIN_ROUTE,
} from "../Constants";

export default function AdminUserLogin() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: handelLogin,
    onSuccess: () => {
      navigate(INITIAL_ROUTE);
    },
  });

  let isAdmin = false;
  if (location.pathname === ADMIN_LOGIN_ROUTE) {
    isAdmin = true;
  }

  let id = localStorage.getItem(LOCAL_TOKEN);

  function handleChangePath() {
    setIsLogin((preVal) => !preVal);
  }

  function loginFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let loginData = Object.fromEntries(data.entries());
    mutate({ data: loginData, admin: isAdmin });
  }
  let errorContent = isError ? (
    <p className="text-red-600 mb-2">{LOGIN_ERROR}</p>
  ) : (
    ""
  );

  switch (true) {
    case id: {
      return <Navigate to={INITIAL_ROUTE} replace />;
    }

    case isPending: {
      return (
        <div className="login-container">
          <div className="loader">
            <Loader />
          </div>
        </div>
      );
    }

    default: {
      return (
        <div className="login-container">
          <div className="login-form">
            <h1 className="login-title">Login</h1>
            <form onSubmit={loginFunction}>
              <div className="form-group">
                <Input
                  label_name="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <Input
                  label_name="Password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Transaction Name"
                  className="form-input"
                  required
                />
              </div>
              {errorContent}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <Link to={isLogin ? LOGIN_ROUTE : ADMIN_LOGIN_ROUTE}>
              <p className="mt-2" onClick={handleChangePath}>
                Login as
                <span className="text-blue-500">
                  {isLogin ? " User" : " Admin"} ?
                </span>
              </p>
            </Link>
          </div>
        </div>
      );
    }
  }
}
