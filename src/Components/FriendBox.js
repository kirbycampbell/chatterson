import React, { useState, useEffect } from "react";
import * as queries from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../graphql/subscriptions";
import "../Css/FriendBox.css";

export const FriendBox = props => {
  const [users, setUsers] = useState([]);
  const [viewSetting, setViewSetting] = useState("Friend-Box");

  // On Render queries for users, and subscribes to User Creation.
  useEffect(() => {
    queryUsers();
    subscriptionUser();
  }, []);

  useEffect(() => {
    friendView();
  }, [props.friendShow]);

  // Queries DB for users.
  const queryUsers = async () => {
    const allUsers = await API.graphql(
      graphqlOperation(queries.listUsers, { limit: 25 })
    );
    setUsers(allUsers.data.listUsers.items);
  };

  // Subscribes to New User Creation & Adds to user array...
  const subscriptionUser = () => {
    API.graphql(graphqlOperation(subscriptions.onCreateUser)).subscribe({
      next: newUserData => {
        const newUser = newUserData.value.data.onCreateUser;
        setUsers(prevUsers => {
          const updatedUsers = [...prevUsers, newUser];
          return updatedUsers;
        });
      }
    });
  };
  const friendView = () => {
    if (props.friendShow) {
      setViewSetting("Friend-Overlay");
    } else {
      setViewSetting("Friend-Box");
    }
  };
  return (
    <div className={viewSetting}>
      {props.auth && (
        <div>
          {users.map(user => {
            if (props.selectedUser === user.id) {
              return (
                <div
                  className="usr-btn chosen"
                  onClick={() => props.setConvo(user.id)}
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </div>
              );
            } else {
              return (
                <div
                  className="usr-btn friend"
                  onClick={() => props.setConvo(user.id)}
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
