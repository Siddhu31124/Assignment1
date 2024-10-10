import React from "react";
import { LoginToken } from "./http";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function Login() {
  const navigate = useNavigate();
  const { mutate, data } = useMutation({
    mutationFn: LoginToken,
    onSuccess: () => {
      navigate("/");
    },
  });
  function handelLogin(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let loginData = Object.fromEntries(data.entries());
    mutate({ data: loginData });
  }
  const id = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (id) {
      navigate("/");
    }
  }, [id, navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handelLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
