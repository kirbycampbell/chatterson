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

  // This Creates a blank new Conversation Model and adds this convo to User 1.
  const createConvo = async () => {
    let convo = await API.graphql(
      graphqlOperation(mutations.createConversation, {
        input: {}
      })
    );
    console.log("Conversation Model Created: ");
    console.log(convo.data.createConversation);
    setConvoId(convo.data.createConversation.id);
    let userConvo = await API.graphql(
      graphqlOperation(mutations.createUserConvo, {
        input: {
          userConvoConversationId: convo.data.createConversation.id,
          userConvoUsersId: props.selectedConvo
        }
      })
    );
    console.log("UserConvo Model Created with Conversation & Sel User Added");
    console.log(userConvo.data.createUserConvo);
    let userConvo2 = await API.graphql(
      graphqlOperation(mutations.createUserConvo, {
        input: {
          userConvoConversationId: convo.data.createConversation.id,
          userConvoUsersId: props.user.id
        }
      })
    );

    console.log("UserConvo Model Created with Conversation & YOUSER Added");
    console.log(userConvo2.data.createUserConvo);
  };

  // This updates the User 1 - showing the added conversation in return (not updating anything really)
  const updateLoggedInUser = async () => {
    let userResult = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: props.user.id }
      })
    );
    console.log("User1's data with UserConvo Id in Array: ");
    console.log(userResult.data.updateUser);
  };

  // This updates the User 2 - showing the added conversation in return (not updating anything really)
  const updateSelectedUser = async () => {
    let userResult = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: props.selectedConvo }
      })
    );
    console.log("User2's data with UserConvo Id in Array: ");
    console.log(userResult.data.updateUser);
  };

  const showConvo = async () => {
    let updatedConvo = await API.graphql(
      graphqlOperation(mutations.updateConversation, {
        input: { id: convoId }
      })
    );
    console.log(updatedConvo);
  };

  return (
    <div className="Chat-Box">
      {props.auth && (
        <div>
          <button onClick={updateLoggedInUser}>Add Convo to User</button>
          <button onClick={updateSelectedUser}>Add Convo to Other User</button>
          <button onClick={showConvo}>Show Convo</button>
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
