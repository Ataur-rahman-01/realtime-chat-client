import React from "react";
import { useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router";
import { useState } from "react";
import "./Chat.css";
import InfoBar from "../info-bar/InfoBar";
import Messages from "../messages/Messages";
import Input from "../Input/Input";
import Active from "../Active/Active";
let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let location = useLocation();
  const ENDPOINT = "http://localhost:5000/";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket = io(`${ENDPOINT}`, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    console.log(socket);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit("disconnects");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);
  // fuction to send message
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  // console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {/* <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        /> */}
      </div>
      <Active users={users} />
    </div>
  );
};

export default Chat;
