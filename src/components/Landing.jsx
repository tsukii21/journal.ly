import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Landing = (props) => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const toggleLogin = () => {
    setIsSigningIn((prevValue) => !prevValue);
  };
  return (
    <div className="landing-container">
      <h1
        style={{
          transform: isSigningIn ? "translateX(0%)" : "translateX(160%)",
        }}
      >
        journal<span style={{ color: "#24E500" }}>.ly</span>
      </h1>
      <Register
        toggleState={isSigningIn}
        showLogin={toggleLogin}
        logUser={props.logUser}
      />
      <Login
        toggleState={isSigningIn}
        showRegister={toggleLogin}
        logUser={props.logUser}
      />
    </div>
  );
};

export default Landing;
