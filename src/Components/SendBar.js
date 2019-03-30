import React from "react";
import "../Css/SendBar.css";

export const SendBar = props => {
  return (
    <div className="sendBar">
      <button className="send-btn" onClick={props.send}>
        Send
      </button>
    </div>
  );
};
