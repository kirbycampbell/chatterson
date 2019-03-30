import React from "react";

import "../Css/NavBar.css";

const NavBar = props => {
  return (
    <div className="NavBar">
      <div className="logo">Chatterson - The App</div>
      {props.loginMsg && <div className="login-msg">{props.loginMsg}</div>}
      {!props.loginMsg && (
        <button className="logout-btn" onClick={props.logout}>
          Logout
        </button>
      )}
      {!props.render && !props.auth && !props.renderIn && (
        <div className="nav-btns">
          <button
            type="button"
            className="navitem1"
            onClick={props.handleUserSignUp}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="navitem2"
            onClick={props.handleUserSignIn}
          >
            Sign In
          </button>
        </div>
      )}
      {props.auth && <p className="welcome">{props.user.name}'s Chat Page</p>}
    </div>
  );
};

export default NavBar;
