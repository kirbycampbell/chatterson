import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import "../Css/ChatBox.css";

export const ChatBox = props => {
  const [conversation, setConversation] = useState([]);
  const [convoId, setConvoId] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect Queries for Messages, and subscribes to new Msgs.
  useEffect(() => {
    if (props.selectedUser) {
      setLoading(true);
      findConvo();
    }
  }, [props.selectedUser]);

  useEffect(() => {
    props.convoSelection(convoId);
  }, [convoId]);

  useEffect(() => {
    scrollFix();
  }, [conversation]);

  // subscriptionMsgs sets a subscription to newMsgs, and updates conversation array.
  const subscriptionMsgs = convoI => {
    API.graphql(graphqlOperation(subscriptions.onCreatePost)).subscribe({
      next: newMsgData => {
        console.log(newMsgData.value.data.onCreatePost);
        // newMsg breaks db return down to normal data
        const newMsg = newMsgData.value.data.onCreatePost;
        if (newMsg.convo === convoI) {
          setConversation(prevConversation => {
            const updatedConvo = [...prevConversation, newMsg];
            return updatedConvo;
          });
        }
      }
    });
    scrollFix();
  };

  const editMsg = id => {
    console.log(id);
  };

  const scrollFix = () => {
    document.getElementById("entire-box").scrollTop = document.getElementById(
      "entire-box"
    ).scrollHeight;
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::::::::::: Search For A Convo With Selected User :::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const findConvo = async () => {
    const fetchConvos = await API.graphql(
      graphqlOperation(queries.getUserConvo, {
        id: props.user.id + props.selectedUser
      })
    );
    const fetchConvo2 = await API.graphql(
      graphqlOperation(queries.getUserConvo, {
        id: props.selectedUser + props.user.id
      })
    );
    if (fetchConvos.data.getUserConvo) {
      setConvoId(fetchConvos.data.getUserConvo.conversation.id);
      queryMsgs(fetchConvos.data.getUserConvo.conversation.id);
    } else if (fetchConvo2.data.getUserConvo) {
      setConvoId(fetchConvo2.data.getUserConvo.conversation.id);
      queryMsgs(fetchConvo2.data.getUserConvo.conversation.id);
    } else {
      makeConvo();
    }
  };

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::::::::::: Query Posts within this Conversation  :::::::::
  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const queryMsgs = async convoi => {
    // queryMsgs queries the DB for all Msgs
    const queryPosts = await API.graphql(
      graphqlOperation(queries.listPosts, {
        filter: {
          convo: { eq: convoi }
        },
        limit: 100
      })
    );

    // Puts the newest message at the bottom of the chatBox
    const sortedMsgs = queryPosts.data.listPosts.items.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    if (sortedMsgs.length < 1) {
      setConversation([]);
      setLoading(false);
    } else {
      setConversation(sortedMsgs);
      setLoading(false);
    }
    subscriptionMsgs(convoi);
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
    console.log(userConvo);
    // Sets Convo.id to App.js State
    props.convoSelection(convo.data.createConversation.id);
    subscriptionMsgs(convo.data.createConversation.id);
    setLoading(false);
  };

  return (
    <div className="Chat-Box" id="entire-box">
      {props.auth && !loading && (
        <div>
          {conversation.map(convo => {
            if (convo.createdByUserId === props.selectedUser) {
              return (
                <p
                  onClick={() => editMsg(convo.id)}
                  className="text-boxes-user"
                  key={convo.id}
                >
                  {convo.body}
                </p>
              );
            } else {
              return (
                <p
                  onClick={() => editMsg(convo.id)}
                  className="text-boxes"
                  key={convo.id}
                >
                  {convo.body}
                </p>
              );
            }
          })}
        </div>
      )}
      <div style={{ float: "left", clear: "both" }} />
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};
