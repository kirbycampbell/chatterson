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
      //subscriptionMsgs();
      findConvo();
      //queryMsgs();
    }
  }, [props.selectedUser]);
  useEffect(() => {
    //subscriptionMsgs();
    //findConvo();
    //queryMsgs();
  }, []);

  // subscriptionMsgs sets a subscription to newMsgs, and updates conversation array.
  // const subscriptionMsgs = () => {
  //   API.graphql(
  //     graphqlOperation(subscriptions.onCreatePost, {
  //       conversation: { id: convoId }
  //     })
  //   ).subscribe({
  //     next: newMsgData => {
  //       console.log(newMsgData.value.data.onCreatePost);
  //       // newMsg breaks db return down to normal data
  //       const newMsg = newMsgData.value.data.onCreatePost;
  //       // setConversation using prevState is done like this
  //       setConversation(prevConversation => {
  //         const updatedConvo = [...prevConversation, newMsg];
  //         return updatedConvo;
  //       });
  //     }
  //   });
  // };

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
      el =>
        el.id === props.selectedUser + props.user.id ||
        el.id === props.user.id + props.selectedUser
    );
    // If a convo is found call getUserConvo
    if (filteredConvos.length > 0) {
      console.log("Found Convo With that User");
      getUserConvo();
    } else {
      makeConvo();
    }
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::::::::::: Sets the Found Convo in Props & State :::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const getUserConvo = async () => {
    const pullConvo = await API.graphql(
      graphqlOperation(queries.getUserConvo, {
        id: props.selectedUser + props.user.id
      })
    );
    setConvoId(pullConvo.data.getUserConvo.conversation.id);
    props.convoSelection(pullConvo.data.getUserConvo.conversation.id);
    queryMsgs(pullConvo.data.getUserConvo.conversation.id);
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::::::::::: Query Posts within this Conversation  :::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // queryMsgs queries the DB for all Msgs
  const queryMsgs = async convo => {
    const queryPosts = await API.graphql(
      graphqlOperation(queries.getConversation, {
        id: convo
      })
    );
    const queryM = await API.graphql(
      graphqlOperation(queries.listPosts, {
        filter: { conversation: { id: convo } }
      })
    );
    console.log(queryM);
    // NOTE FOR TOMORROW - THE ABOVE ISN'T ACTUALLY FILTERING FOR THE
    // SPECIFIC POSTS... THINK OF A NEW WAY.
    // I TRIED FILTERING THE CONVO, BUT THE POSTS RETURNED AT A LIMIT OF 10.
    ///console.log(queryPosts);
    // Puts the newest message at the bottom of the chatBox
    const sortedMsgs = queryPosts.data.getConversation.posts.items.sort(
      (a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    );
    if (sortedMsgs.length < 1) {
      setConversation([]);
    } else {
      setConversation(sortedMsgs);
    }
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
