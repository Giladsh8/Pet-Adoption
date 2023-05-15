import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import { Link } from "react-router-dom";
import myImage from "../img/Group 3.jpg";
import { usePetsContext } from "./PetsContext";

export default function FirstGreet() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const closeSignupModal = () => setSignupModal(false);
  const closeLoginModal = () => setLoginModal(false);
  const { checkToken, currentName, getUserDetails } = usePetsContext();

  useEffect(() => {
    checkToken();
    // getUserDetails();
  }, [currentName]);

  useEffect(() => {
    getUserDetails();
  }, [currentName]);

  return (
    <>
      <div className="welcom-section">
        <div className="title-greet">
          <h1 className="hello">Hello</h1>
          <h1>Human!</h1>
        </div>
        <h2>We are a nonprofit organization who shelters stary pets</h2>
        <h3>Our main goal is to help you to find your new Best Friend!</h3>
        <button className="login-button" onClick={() => setLoginModal(true)}>
          Login
        </button>
        {!currentName && (
          <div className="account">
            Don't have an account?{" "}
            <span
              className="signup-activate"
              onClick={() => setSignupModal(true)}
            >
              sign up
            </span>
          </div>
        )}

        <div className="search-img">
          <Link className="search-link" to="/search">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5132 21.168L18.4413 16.0954C19.674 14.3808 20.3518 12.3318 20.3518 10.175C20.3518 7.45832 19.2941 4.90336 17.3703 2.98134C15.4507 1.06014 12.894 0 10.1756 0C7.45791 0 4.90204 1.05765 2.98078 2.98134C1.05952 4.9017 0.000999451 7.45749 0.000999451 10.175C0.000999451 12.8926 1.05869 15.4475 2.98078 17.3704C4.90204 19.2916 7.45708 20.3517 10.1756 20.3517C12.3316 20.3517 14.3789 19.6773 16.0953 18.4413L21.1672 23.5139C21.4924 23.8382 21.9155 24 22.3402 24C22.7658 24 23.1897 23.8382 23.5132 23.5139C24.1611 22.8652 24.1611 21.8158 23.5132 21.168ZM5.3276 15.0236C4.03183 13.7279 3.31924 12.005 3.31924 10.1742C3.31924 8.34343 4.03183 6.62215 5.3276 5.32642C6.62255 4.03069 8.34388 3.3173 10.1756 3.3173C12.0072 3.3173 13.7294 4.03069 15.0243 5.32642C16.3201 6.62215 17.0335 8.34426 17.0335 10.175C17.0335 12.0058 16.3209 13.7279 15.0243 15.0245C13.7286 16.3202 12.008 17.0319 10.1756 17.0319C8.34305 17.0319 6.62089 16.3185 5.3276 15.0236Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="search">Search</span>
            <span className="friend">Friend</span>
            <span>
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.2045 1.2045C0.765165 1.64384 0.765165 2.35616 1.2045 2.7955L6.40901 8L1.2045 13.2045C0.765165 13.6438 0.765165 14.3562 1.2045 14.7955C1.64384 15.2348 2.35616 15.2348 2.7955 14.7955L8.79443 8.79656C9.23435 8.35663 9.23436 7.64337 8.79444 7.20345L2.7955 1.2045C2.35616 0.765165 1.64384 0.765165 1.2045 1.2045Z"
                  fill="#0C0D0D"
                />
              </svg>
            </span>
          </Link>
          <img src={myImage}></img>
        </div>
      </div>
      <Modal show={signupModal} onHide={closeSignupModal}>
        <Signup setLoginModal={setLoginModal} setSignupModal={setSignupModal} />
      </Modal>
      <Modal show={loginModal} onHide={closeLoginModal}>
        <Login setLoginModal={setLoginModal} />
      </Modal>
      ;
    </>
  );
}
