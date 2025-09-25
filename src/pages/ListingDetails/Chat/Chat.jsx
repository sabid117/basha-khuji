import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", { text: message });
      setMessage("");
    }
  };

  return (
    <section className="py-10 px-6 bg-white dark:bg-base-200 min-h-screen">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Live Chat</h2>

        {/* Chat Box */}
        <div className="bg-base-100 rounded shadow p-4 h-80 overflow-y-auto mb-4 space-y-2">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="chat chat-start">
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="btn btn-primary">Send</button>
        </div>
      </div>
    </section>
  );
}
