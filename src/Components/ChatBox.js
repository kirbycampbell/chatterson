import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import "../Css/ChatBox.css";

export const ChatBox = props => {
  const [conversation, setConversation] = useState([]);
  const [convoId, setConvoId] = useState(null);

  // useEffect Queries for Messages, and subscribes to new Msgs.
  useEffect(() => {
    if (props.selectedConvo) {
      //queryMsgs();
      //subscriptionMsgs();
      createConvo();
      //createConvo2();
    }
  }, [props.selectedConvo]);

  // // Send assigns Msg state and sends it to DB....
  // const send = async () => {
  //   const postDeets = {
  //     body: message,
  //     createdAt: ""
  //   };
  //   await API.graphql(
  //     graphqlOperation(mutations.createPost, { input: postDeets })
  //   );
  //   // Resets Message form to empty...
  //   setMessage("");
  // };

  // queryMsgs queries the DB for all Msgs
  const queryMsgs = async () => {
    const allMsgs = await API.graphql(
      graphqlOperation(queries.listPosts, { limit: 100 })
    );
    // sortedMsgs puts the newest message at the bottom of the chatBox
    const sortedMsgs = allMsgs.data.listPosts.items.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setConversation(sortedMsgs);
  };

  // subscriptionMsgs sets a subscription to newMsgs, and updates conversation array.
  const subscriptionMsgs = () => {
    API.graphql(graphqlOperation(subscriptions.onCreatePost)).subscribe({
      next: newMsgData => {
        // newMsg breaks db return down to normal data
        const newMsg = newMsgData.value.data.onCreatePost;

        // setConversation using prevState is done like this
        setConversation(prevConversation => {
          const updatedConvo = [...prevConversation, newMsg];
          return updatedConvo;
        });
      }
    });
  };

  const editMsg = id => {
    console.log(id);
  };

  // This Creates a blank new Conversation Model
  const createConvo = async () => {
    let result = await API.graphql(
      graphqlOperation(mutations.createConversation, {
        input: {
          name: "First Created Convo for Sage",
          userConversationsId: props.user.id
        }
      })
    );
    console.log(result.data.createConversation);
    setConvoId(result.data.createConversation);
  };

  // This Changes the Conversation "name" and assigns the convo to a User Model.
  const createConvo2 = async () => {
    let updatedConvo = await API.graphql(
      graphqlOperation(mutations.updateConversation, {
        input: {
          id: convoId.id,
          name: "Second Updated Convo for Jkrb",
          userConversationsId: props.selectedConvo
        }
      })
    );
    console.log(updatedConvo.data.updateConversation);
  };

  // This updates the User Model - showing the added conversation.
  const addConvoToUser = async () => {
    let userResult = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: props.user.id }
      })
    );
    console.log(userResult.data.updateUser);
  };

  const addConvoToOtherUser = async () => {
    let userResult = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: props.selectedConvo }
      })
    );
    console.log(userResult.data.updateUser);
  };

  return (
    <div className="Chat-Box">
      {props.auth && (
        <div>
          <button onClick={createConvo2}>Add Name to Convo</button>
          <button onClick={addConvoToUser}>Add Convo to User</button>
          <button onClick={addConvoToOtherUser}>Add Convo to Other User</button>

          {conversation.map(convo => {
            return (
              <p
                onClick={() => editMsg(convo.id)}
                className="text-boxes"
                key={convo.id}
              >
                {convo.body}
              </p>
            );
          })}
        </div>
      )}
      <div style={{ float: "left", clear: "both" }} />
    </div>
  );
};
