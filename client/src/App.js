import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatForm from "./components/ChatForm";
import ChatRoom from "./components/ChatRoom";

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatForm />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>
    </div>
  );
}

export default App;
