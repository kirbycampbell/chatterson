import React, { useState, useEffect } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
//import * as subscriptions from "../graphql/subscriptions";
import awsmobile from "./aws-exports";
import NavBar from "./Components/NavBar";
import { FriendBox } from "./Components/FriendBox";
import { TypeBox } from "./Components/TypeBox";
import { ChatBox } from "./Components/ChatBox";
import { SignUp } from "./Components/SignUp";
import { SignIn } from "./Components/SignIn";
import useInterval from "./useInterval";

Amplify.configure(awsmobile);
var bcrypt = require("bcryptjs");

// OuterMost Layer for the App Management
const App = () => {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [loginMsg, setLoginMsg] = useState("");
  const [loginMsgTimer, setLoginMsgTimer] = useState(0);
  const [selectedConvo, setSelectedConvo] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userName") && localStorage.getItem("userPw")) {
      let user = { name: localStorage.getItem("userName") };
      let pw = localStorage.getItem("userPw");
      authUser(user, pw);
    }
  }, []);

  useInterval(() => {
    if (loginMsg && loginMsgTimer >= 2) {
      setLoginMsg(false);
    } else if (loginMsg && loginMsgTimer < 2) {
      setLoginMsgTimer(loginMsgTimer + 1);
    }
  }, 1000);

  // TODO:::::::::::::::::::::::::::::
  // Set Convo will be for connecting the logged in user-
  // to the chat window of the user id chosen.
  const setConvo = id => {
    setSelectedConvo(id);
  };

  // Manages Login/SignUp Form Visibility
  const handleUserSignUp = () => {
    setSignUp(!signUp);
  };
  const handleUserSignIn = () => {
    setSignIn(!signIn);
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //::::::::: AUTH & SIGN IN :::::::::::::::::::::::::::::::::::::::::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const authUser = (user, pwd) => {
    const searchUser = async () => {
      // AUTHORIZING USER BELOW
      const findUser = await API.graphql(
        // Query/Filter DB for USER
        graphqlOperation(queries.listUsers, {
          limit: 200,
          filter: { name: { eq: user.name } }
        })
      );
      const dbUserInfo = findUser.data.listUsers.items[0];
      if (pwd === dbUserInfo.password) {
        userSignIn(dbUserInfo);
      } else {
        bcrypt.compare(pwd, dbUserInfo.password).then(isMatch => {
          // Bcrypt Compares user entered password with hashed Backend Password
          if (isMatch && dbUserInfo.name === user.name) {
            // If pw & username match - call userSignIn
            userSignIn(dbUserInfo);
          } else if (!isMatch && dbUserInfo.name === user.name) {
            // If password incorrect, notify user!
            setLoginMsg("Password INCORRECT!");
          } else {
            // If Everything is incorrect, notify user!
            setLoginMsg("User/Password Incorrect");
          }
        });
      }
    };
    searchUser(); // Calls the above method ^^^
  };

  const userSignIn = dbUserInfo => {
    // SignIn Sequence
    setUser(dbUserInfo); // Sets UserInfo in state
    setAuth(true); // App is authd -- render User's page
    setSignUp(false); // Get rid of SignUp Form
    setSignIn(false); // Get rid of SignUp Form
    setLoginMsg("Sign In Successful"); // Notify User of Successful Login
    localStorage.setItem("userName", dbUserInfo.name); // Set LocalStorage for Relogin
    localStorage.setItem("userPw", dbUserInfo.password); // Set LocalStorage for Relogin
    console.log(dbUserInfo);
  };

  const logout = () => {
    setUser([]); // Sets UserInfo in state
    setAuth(false); // App is authd -- render User's page
    setSignUp(false); // Get rid of SignUp Form
    setSignIn(true); // Get rid of SignUp Form
    setLoginMsg("Sign Out Successful"); // Notify User of Successful Login
    localStorage.setItem("userName", ""); // Set LocalStorage for Relogin
    localStorage.setItem("userPw", ""); // Set LocalStorage for Relogin
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::::::::: Render App Below ::::::::::::::::::::::::::::::::::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  return (
    <div className="App">
      <NavBar
        handleUserSignUp={handleUserSignUp}
        handleUserSignIn={handleUserSignIn}
        render={signUp}
        renderIn={signIn}
        loginMsg={loginMsg}
        auth={auth}
        user={user}
        logout={logout}
      />
      <SignUp
        authUser={authUser}
        render={signUp}
        handleUserSignUp={handleUserSignUp}
      />
      <SignIn
        authUser={authUser}
        render={signIn}
        handleUserSignIn={handleUserSignIn}
      />
      <ChatBox auth={auth} user={user} selectedConvo={selectedConvo} />
      <FriendBox setConvo={setConvo} auth={auth} />
      <TypeBox />
    </div>
  );
};
export default App;
