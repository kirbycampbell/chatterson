import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import "../Css/SignUp.css";
import useInterval from "./../useInterval";
var bcrypt = require("bcryptjs");

export const SignUp = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);
  const [hashPass, setHashPass] = useState("");
  const [hashTimer, setHashTimer] = useState(false);
  const [count, setCount] = useState(0);

  // Adds 0.5s before adding hashed password to db - Hook for setInterval
  useInterval(() => {
    if (hashTimer && count >= 0.5) {
      setHashTimer(false);
      addNewUser();
    } else if (hashTimer && count < 0.5) {
      setCount(count + 1);
      console.log(count);
    }
  }, 1000);

  // handleUserSignUp grabs state and mutates DB with createUser
  const handleUserSignUp = () => {
    setHashTimer(true);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        setHashPass(hash);
        console.log("Make Password Hash:");
        console.log(hash);
      });
    });
  };

  // This is called after the timer runs for 0.5s and mutates the DB
  const addNewUser = async () => {
    // Assigns newUser to object for mutating
    let newUser = {
      name: username,
      password: hashPass,
      createdAt: ""
    };
    // Takes newUser and mutates DB
    await API.graphql(
      graphqlOperation(mutations.createUser, { input: newUser })
    );
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
      <div className="sign-up-form">
        <input name="username" placeholder="UserName" onChange={handleTyping} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleTyping}
        />
        <button
          type="submit"
          className="sign-up-btn"
          onClick={props.handleUserSignUp}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="sign-up-btn"
          onClick={handleUserSignUp}
        >
          Sign Up
        </button>
      </div>
    );
  } else return null;
};
