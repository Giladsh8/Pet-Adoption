import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";
import { usePetsContext } from "./PetsContext";

const refresh = () => window.location.reload(true);

export default function Signup({ setSignupModal, setLoginModal }) {
  const { currentName, logedUserDetails, checkToken } = usePetsContext();

  useEffect(() => {
    checkToken();
  }, []);

  const usDet = logedUserDetails[0];
  console.log("eden", usDet);
  const [signupInfo, setSignupInfo] = useState({
    email: usDet?.email || "",
    password: "",
    rePassword: "",
    firstName: usDet?.firstName || "",
    lastName: usDet?.lastName || "",
    phone: usDet?.phone || "",
  });

  const handleSignupInfo = (e) => {
    if (e.target.type === "checkbox") {
      setSignupInfo({ ...signupInfo, [e.target.name]: e.target.checked });
      return;
    }
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    console.log(signupInfo);
  };

  const sendSignUserBack = async () => {
    if (logedUserDetails) {
      try {
        const res = await axios.put(
          `http://localhost:8080/users/update/${logedUserDetails[0].userId}`,
          signupInfo
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    } else
      try {
        const res = await axios.post(
          "http://localhost:8080/users/signup",
          signupInfo
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSignUserBack();
    setSignupModal(false);
    setLoginModal(true);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="signup-form">
          {currentName ? <h2>Update Your Account</h2> : <h2>Create Account</h2>}
          <input
            className="signup-input"
            type="email"
            value={signupInfo.email}
            placeholder="Email"
            name="email"
            onChange={handleSignupInfo}
          ></input>
          <input
            className="signup-input"
            type="password"
            value={signupInfo.password}
            name="password"
            ain
            placeholder="Password"
            onChange={handleSignupInfo}
          ></input>
          <input
            className="signup-input"
            type="password"
            value={signupInfo.rePassword}
            name="rePassword"
            placeholder="Enter Password Again"
            onChange={handleSignupInfo}
          ></input>
          <input
            className="signup-input"
            type="text"
            value={signupInfo.firstName}
            name="firstName"
            placeholder="First Name"
            onChange={handleSignupInfo}
          ></input>
          <input
            className="signup-input"
            type="text"
            value={signupInfo.lastName}
            name="lastName"
            placeholder="Last Name"
            onChange={handleSignupInfo}
          ></input>
          <input
            className="signup-input"
            type="text"
            value={signupInfo.phone}
            name="phone"
            placeholder="Phone"
            onChange={handleSignupInfo}
          ></input>
          {currentName ? (
            <button type="submit" className="signup-button">
              Update
            </button>
          ) : (
            <button type="submit" className="signup-button">
              Signup
            </button>
          )}
        </form>
      </div>
    </>
  );
}
