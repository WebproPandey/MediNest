import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  chatMessageReceived,
  chatMessageSent,
  clearChat,
} from "../redux/action/chatActions";

const socket = io("http://localhost:5000", { withCredentials: true });

const ConsultationChat = ({ consultationId, userName }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    socket.emit("join_consultation", consultationId);

    socket.on("chat_message", (msg) => {
      dispatch(chatMessageReceived(msg));
    });

    return () => {
      socket.off("chat_message");
      dispatch(clearChat());
    };
  }, [consultationId, dispatch]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = {
      consultationId,
      sender: userName,
      message: input,
      time: new Date(),
    };
    socket.emit("chat_message", msg);
    dispatch(chatMessageSent(msg));
    setInput("");
  };

  return (
    <div className="border rounded p-4 w-full h-96 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 ${msg.sender === userName ? "text-right" : "text-left"}`}>
            <span className="font-bold">{msg.sender}: </span>
            <span>{msg.message}</span>
            <div className="text-xs text-gray-400">{new Date(msg.time).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-green-600 text-white px-4 py-1 rounded" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ConsultationChat;