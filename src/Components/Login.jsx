import React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router";
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

//Rename the component
export default function Login() {
  const location = useLocation();
  //Rename this state
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: handelLogin,
    onSuccess: () => {
      navigate(INITIAL_ROUTE);
    },
  });

  //Remove this variable, we can compute this from the condition itself
  let isAdmin = location.pathname === ADMIN_LOGIN_ROUTE;
  //rename this as userId
  let user_Id = localStorage.getItem(LOCAL_TOKEN);

  function loginFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let loginData = Object.fromEntries(data.entries());
    mutate({ data: loginData, admin: isAdmin });
  }

  //avoid jsx variables over functions

  let errorContent = () => {
    if (isError) {
      return <p className="text-red-600 mb-2">{LOGIN_ERROR}</p>;
    }
  };

  //Change these code as render functions

  const loginForm = () => {
    switch (true) {
      case user_Id: {
        return <Navigate to={INITIAL_ROUTE} replace />;
      }

      case isPending: {
        return (
          <div className="loader">
            <Loader />
          </div>
        );
      }

      default: {
        return (
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
              {errorContent()}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <Link to={isAdmin ? LOGIN_ROUTE : ADMIN_LOGIN_ROUTE}>
              <p className="mt-2">
                Login as
                <span className="text-blue-500">
                  {isAdmin ? " User" : " Admin"} ?
                </span>
              </p>
            </Link>
          </div>
        );
      }
    }
  };

  return <div className="login-container">{loginForm()}</div>;
}
