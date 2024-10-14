import React from "react";
import { loginToken } from "./http";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router";
import Input from "../utils/Input";
import Loader from "../utils/Loader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function AdminLogin({ admin }) {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: loginToken,
    onSuccess: () => {
      navigate("/");
    },
  });
  let id = localStorage.getItem("token");
  function handelLogin(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let loginData = Object.fromEntries(data.entries());
    mutate({ data: loginData, admin: admin });
    localStorage.setItem("userDetails", loginData.email);
  }
  return (
    <>
      {id ? (
        <Navigate to="/" replace />
      ) : (
        <div className="login-container">
          {isPending ? (
            <Loader />
          ) : (
            <div className="login-form">
              <h1 className="login-title">Login</h1>
              <form onSubmit={handelLogin}>
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
                {isError && (
                  <p className="text-red-600 mb-2">
                    Please Enter Valid Details
                  </p>
                )}
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
              <Link to="/login">
                <p className="mt-2">
                  Login as <span className="text-blue-500">User ?</span>
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
