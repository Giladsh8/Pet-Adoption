import React, { useState } from "react";
import { usePetsContext } from "./PetsContext";

export default function Login({ setLoginModal }) {
  const { login } = usePetsContext();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginDetails);
    setLoginModal(false);
  };

  const handleLoginDetails = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-section">
      <h1>Login</h1>
      <input
        className="signup-input"
        type="email"
        onChange={handleLoginDetails}
        value={loginDetails.email}
        placeholder="Email"
        name="email"
      ></input>
      <input
        className="signup-input"
        type="password"
        onChange={handleLoginDetails}
        value={loginDetails.password}
        placeholder="Password"
        name="password"
      ></input>
      <button className="signup-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
