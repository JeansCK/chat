import React, { useEffect, useRef } from "react";

const Message = (props) => {
  const message = props.message;
  const messageRef = useRef(null);
  const name = props.name;

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  },[]);

  const ownDivStyle = {
    textAlign: "right"
  }
  
  const ownBadgeStyle = {
    backgroundColor: "#34BE82"
  }

  const otherBadgeStyle = {
    backgroundColor: "#2F86A6"
  } 

  return (
    <div style={name===message.user?ownDivStyle:null} ref={messageRef}>
      {name!==message.user && message.user}
      <p>
        <span className="badge rounded-pill" style={name===message.user?ownBadgeStyle:otherBadgeStyle}>
          {message.text}
        </span>
      </p>
    </div>
  );
}

export default Message;