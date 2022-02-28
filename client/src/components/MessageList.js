import React from "react";
import Message from "./Message";

const MessageList = (props) => {
  const messages = props.messages;
  const name = props.name;
  return(
    <div className="modal-body overflow-scroll">
      {messages.map((message, index) => (<Message key={index} name={name} message={message} />))}
    </div>
  );
}

export default MessageList;