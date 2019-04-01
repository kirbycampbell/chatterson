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
    if (props.selectedUser) {
      //queryMsgs();
      //subscriptionMsgs();
      findConvo();
    }
  }, [props.selectedUser]);

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

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::::::::::: Search For A Convo With Selected User :::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const findConvo = async () => {
    // This gets the Logged in User's Convo List
    const myConvos = await API.graphql(
      graphqlOperation(queries.getUser, {
        id: props.user.id
      })
    );
    // Filters through the User's Convos
    const filteredConvos = myConvos.data.getUser.conversations.items.filter(
      el => el.id === props.selectedUser + props.user.id
    );
    // If a convo is found call getUserConvo
    if (filteredConvos.length > 0) {
      console.log("Found Convo With that User");
      getUserConvo();
    } else {
      makeConvo();
    }
  };
  // This gets the UserConvo with id equal to the selected User
  const getUserConvo = async () => {
    const pullConvo = await API.graphql(
      graphqlOperation(queries.getUserConvo, {
        id: props.selectedUser + props.user.id
      })
    );
    setConvoId(pullConvo.data.getUserConvo.conversation.id);
    props.convoSelection(pullConvo.data.getUserConvo.conversation.id);
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //::::::: Creating New Convo & UserConvo Models ::::::::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const makeConvo = async () => {
    // New Convo Creation
    let convo = await API.graphql(
      graphqlOperation(mutations.createConversation, {
        input: {}
      })
    );
    setConvoId(convo.data.createConversation.id);
    console.log("convo Created!");
    // New UserConvo Creation
    let userConvo = await API.graphql(
      graphqlOperation(mutations.createUserConvo, {
        input: {
          id: props.selectedUser + props.user.id,
          userConvoConversationId: convo.data.createConversation.id,
          userConvoUsersId: props.user.id
        }
      })
    );
    // Sets Convo.id to App.js State
    props.convoSelection(convo.data.createConversation.id);
    console.log("User Convo Created w/ UserConvo.id set to selected User's Id");
  };

  return (
    <div className="Chat-Box">
      {props.auth && (
        <div>
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
