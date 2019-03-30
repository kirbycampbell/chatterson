import React, { useState } from "react";
import "../Css/SignIn.css";

export const SignIn = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);

  // This is called after the timer runs for 0.5s and mutates the DB
  const validateUser = async () => {
    // Assigns newUser to object for mutating
    let newUser = {
      name: username,
      password: password
    };
    // Sets User as logged in - this method is in App.js
    props.authUser(newUser, password);
    // Resets Forms
    setUsername("");
    setPassword("");
  };

  // Function handles userName & Password forms & assigns to state
  const handleTyping = event => {
    let content = event.target.value;
    let item = event.target.name;
    if (item === "username") {
      setUsername(content);
    } else if (item === "password") {
      setPassword(content);
    }
  };

  if (props.render) {
    return (
      <div className="sign-in-form">
        <input name="username" placeholder="UserName" onChange={handleTyping} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleTyping}
        />
        <button
          type="submit"
          className="sign-in-btn"
          onClick={props.handleUserSignIn}
        >
          Cancel
        </button>
        <button type="submit" className="sign-in-btn" onClick={validateUser}>
          Sign In
        </button>
      </div>
    );
  } else return null;
};
