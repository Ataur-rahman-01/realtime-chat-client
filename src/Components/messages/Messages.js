import React from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./mess/Message";
import "./Messages.css";

const Messages = ({ messages, name }) => {
  return (
    // <ScrollToBottom className="messages">
    <div className="messages ex3">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
      {/* </ScrollToBottom> */}
    </div>
  );
};

export default Messages;
