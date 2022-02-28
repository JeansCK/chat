import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const ChatForm = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("public");
  const navigate = useNavigate();
  const userRef = useRef(null);

  useEffect(() => {
    userRef.current.focus();
  },[]);

  function onUserChange(e) {
      setName(e.target.value)
  }

  function onSubmit(e) {
    if (name) {
      navigate({
        pathname: "/chatroom",
        search: `?name=${name}&room=${room}`
      });
    }
  }

  return (
    <div className="container py-5 chat-form">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Please enter your name"
            value={name}
            onChange={onUserChange}
            ref={userRef}
          />
          <button className="btn btn-outline-primary">Join</button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;