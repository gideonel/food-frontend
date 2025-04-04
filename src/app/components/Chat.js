"use client";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { X, MessageCircle } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("https://food-backend.blosomtrade.com/");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🟢 Connected to server!");
    });

    newSocket.on("disconnect", () => {
      console.log("🔴 Disconnected from server");
    });

    newSocket.on("receive-message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("send-message", message);  
      setMessage("");  
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}  
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-lg p-4 border">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-purple-500">Live Chat</h3>
            <button
              onClick={() => setIsOpen(false)}  // Close chat modal
              className="text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="border p-2 h-48 overflow-auto">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 border-b">
                <strong>{msg.sender}: </strong>{msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll reference */}
          </div>

          {/* Chat Input */}
          <input
            type="text"
            className="p-2 border rounded w-full mt-2 text-gray-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  // Handle input change
            placeholder="Type a message"
          />
          <button
            className="bg-purple-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full"
            onClick={sendMessage}  // Send message on button click
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default Chat;
