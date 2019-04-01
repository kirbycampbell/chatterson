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
    // Creates Convo Post
    const newConvoPost = await API.graphql(
      graphqlOperation(mutations.createConvoPosts, {
        input: {
          //convoPostsConversationsId: message1.data.createPost.id
          convoPostsConversationsId: props.convo
        }
      })
    );
    console.log("Convo Post::: ");
    console.log(newConvoPost);
    // Creates the New Post
    const message1 = await API.graphql(
      graphqlOperation(mutations.createPost, {
        input: {
          body: `${message}`,
          createdAt: "",
          postConversationId: newConvoPost.data.createConvoPosts.id
        }
      })
    );
    // Resets Message form to empty...
    setMessage("");
    console.log("Show New Post::: ");
    console.log(message1);
  };

  // TOMORROW:
  // Try Adjusting the GraphQL schema even further.
  // Maybe a join table isn't needed for posts...
  // A Post only needs one Convo, a Convo needs many Posts.

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
