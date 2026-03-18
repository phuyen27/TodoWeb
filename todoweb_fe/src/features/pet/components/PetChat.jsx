import { useState } from "react";

export default function PetChat({ messages, onSend  }) {

    const [input, setInput] = useState("");

    const handleSend = () => {
        onSend(input);
        setInput("");
    };

     return (
    <div className="pet-chat">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.role === "user" ? "user" : "pet"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to your pet..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}