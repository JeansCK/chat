import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Collapse } from "bootstrap";

let socket;

const ChatRoom = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name").trim().toLowerCase();
  const room = searchParams.get("room").trim().toLowerCase();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    if (!name) {
      navigate("/");

    } else {

      socket = io(process.env.REACT_APP_SERVER_URL);
      sessionStorage.setItem("socketId", socket.id);

      join();

      socket.on("message", message => {
        // setMessages([...messages, message]); // This code will replace messages array with message object
        setMessages(messages => [...messages, message]); // Have to use function
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });

      socket.io.on("reconnect", (attempt) => {
        join();
      });

    }

  // eslint-disable-next-line
  }, []);
  
  const sendMessage = (message) => {
    socket.emit("sendMessage", { message });
  }

  const join = () => {
    socket.emit("join", { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }

  const exitRoom = () => {
    sessionStorage.setItem("name", "");
    socket.disconnect();
    navigate("/");
  }

  return (
   <div className="model">
     <div className="modal-dialog modal-fullscreen-md-down">
      <div className="modal-content">
        <div className="modal-header py-1">
          
          <button className="btn btn-sm btn-outline-primary" onClick={exitRoom}>Exit</button>
          
          <div className="accordion" id="userList">
            <div className="accordion-item">
              <p className="accordion-header" id="headingOne">
                <button className="accordion-button py-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  {users.length} users in room
                </button>
              </p>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#userList">
                <div className="accordion-body">
                  <ul>
                      {users.map(({name}) => (
                        <li key={name}>{name}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
        <MessageList name={name} messages={messages}/>
        <MessageForm sendMessage={sendMessage}/>
      </div>
    </div>
  </div>
  )
}

export default ChatRoom;