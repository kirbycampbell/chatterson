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
    const postDeets = {
      body: "Stinker",
      createdAt: ""
    };
    const message = await API.graphql(
      graphqlOperation(mutations.createPost, { input: postDeets })
    );
    // Resets Message form to empty...
    setMessage("");
    console.log("Show New Post::: ");
    console.log(message);

    const newConvoPost = await API.graphql(
      graphqlOperation(mutations.createConvoPosts, {
        input: {
          convoPostsContentsId: message.data.createPost.id,
          convoPostsConversationsId: props.convo
        }
      })
    );
    console.log("Convo Post::: ");
    console.log(newConvoPost);
    // await API.graphql(
    //   graphqlOperation(mutations.createConvoPosts, {
    //     input: {
    //       convoPostsContentsId: message.data.createPost.id,
    //       convoPostsConversationsId: props.selectedConvo
    //     }
    //   })
    // );
  };

  const showConvo = async () => {
    const convoo = await API.graphql(
      graphqlOperation(queries.getConversation, {
        id: props.convo
      })
    );
    console.log("Show Convoo::: ");
    console.log(convoo);
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
      <button onClick={showConvo}>Show Convo</button>
      <SendBar send={send} />
    </div>
  );
};
