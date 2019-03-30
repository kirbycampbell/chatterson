import React, { useState, useEffect } from "react";
import * as queries from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../graphql/subscriptions";
import "../Css/FriendBox.css";

export const FriendBox = props => {
  const [users, setUsers] = useState([]);

  // On Render queries for users, and subscribes to User Creation.
  useEffect(() => {
    queryUsers();
    subscriptionUser();
  }, []);

  // Queries DB for users.
  const queryUsers = async () => {
    const allUsers = await API.graphql(
      graphqlOperation(queries.listUsers, { limit: 10 })
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

  return (
    <div className="Friend-Box">
      {props.auth && (
        <div>
          {users.map(user => (
            <div
              className="usr-btn friend"
              onClick={() => props.setConvo(user.id)}
              key={user.id}
              value={user.id}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
