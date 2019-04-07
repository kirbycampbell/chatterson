import React, { useState } from "react";
import { SendBar } from "./SendBar";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import "../Css/TypeBox.css";

export const TypeBox = props => {
  const [message, setMessage] = useState("");

  // When Typing- sets message state to that which is typed...
  const typing = event => {
    setMessage(event.target.value);
  };

  // Send assigns Msg state and sends it to DB....
  const send = async () => {
    // Creates the New Post
    const newMSG = await API.graphql(
      graphqlOperation(mutations.createPost, {
        input: {
          body: `${message}`,
          createdAt: "",
          postConversationId: props.convo,
          createdByUserId: props.user.id,
          convo: props.convo
        }
      })
    );

    await API.graphql(
      graphqlOperation(mutations.updateConversation, {
        input: { id: props.convo }
      })
    );

    //Resets Message form to empty...
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
