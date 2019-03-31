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
      // if (convoId) {
      //   addUserToConvo();
      // }
    }
  }, [props.selectedConvo]);

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
    const user1Convos = await API.graphql(
      graphqlOperation(queries.getUser, {
        id: props.user.id
      })
    );
    console.log(user1Convos.data.getUser.conversations);

    // let convo = await API.graphql(
    //   graphqlOperation(mutations.createConversation, {
    //     input: {}
    //   })
    // );
    // setConvoId(convo.data.createConversation.id);
    // console.log("convo Created!");

    // let userConvo = await API.graphql(
    //   graphqlOperation(mutations.createUserConvo, {
    //     input: {
    //       userConvoConversationId: convoId,
    //       userConvoUsersId: props.selectedConvo
    //     }
    //   })
    // );
    // let userConvo2 = await API.graphql(
    //   graphqlOperation(mutations.createUserConvo, {
    //     input: {
    //       userConvoConversationId: convoId,
    //       userConvoUsersId: props.user.id
    //     }
    //   })
    // );
  };

  const showConvo = async () => {
    let updatedConvo = await API.graphql(
      graphqlOperation(mutations.updateConversation, {
        input: { id: convoId }
      })
    );
    console.log(updatedConvo.data.updateConversation.users.items);
  };

  return (
    <div className="Chat-Box">
      {props.auth && (
        <div>
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
