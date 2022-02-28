import React, { useState, useEffect, useRef } from "react";

const MessageForm = (props) => {

  const [message, setMessage] = useState("")
  const messageRef = useRef(null)

  useEffect(() => {
    messageRef.current.focus();
  },[]);
  
  function onSubmit(e) {
    e.preventDefault();
    if (message !== "") {
      props.sendMessage(message);
    }
    setMessage("")
  }

  function onMessageChange(e) {
      setMessage(e.target.value);
  }

  return (
    <div className="modal-footer py-1">
    <form onSubmit={onSubmit}>
      <div className="input-group mb-0 message-form">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={onMessageChange}
          ref={messageRef}
        />
        <button className="btn btn-success">Send</button>
      </div>
    </form>
    </div>
  );

}

export default MessageForm;