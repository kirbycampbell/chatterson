import React, { useState } from "react";
import { SendBar } from "./SendBar";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import "../Css/TypeBox.css";

export const TypeBox = () => {
  const [message, setMessage] = useState("");

  // When Typing- sets message state to that which is typed...
  const typing = event => {
    setMessage(event.target.value);
  };

  // Send assigns Msg state and sends it to DB....
  const send = async () => {
    const postDeets = {
      body: message,
      createdAt: ""
    };
    await API.graphql(
      graphqlOperation(mutations.createPost, { input: postDeets })
    );
    // Resets Message form to empty...
    setMessage("");
  };

  return (
    <div>
      <div className="Type-Box">
        <textarea
          className="txtarea"
          placeholder="type here"
          value={message}
          onChange={typing}
        />
      </div>
      <SendBar send={send} />
    </div>
  );
};
