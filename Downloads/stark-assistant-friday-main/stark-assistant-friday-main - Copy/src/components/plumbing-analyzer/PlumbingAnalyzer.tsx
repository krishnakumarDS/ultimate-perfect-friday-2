import { useEffect, useState } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { Message } from "../../types/plumbing-types";
import "./plumbing-analyzer.scss";

const USERNAME = "User";

export function FridayAssistant() {
  const { client, connected, setConfig } = useLiveAPIContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (client && connected) {
      const config = {
        model: "gemini-pro-vision",
        temperature: 0.7,
        maxOutputTokens: 2048,
      };
      setConfig(config);

      const welcomeMessage = {
        type: 'ai' as const,
        role: 'assistant',
        content: `Hello ${USERNAME}! 👋 I'm Friday, your advanced AI voice assistant.

I can help you with:
• Analyzing visual information through your camera
• Answering questions and providing information
• Assisting with daily tasks and complex problems
• Offering step-by-step guidance
• Providing real-time support and solutions

How can I assist you today?`
      };

      setMessages([welcomeMessage]);
    }
  }, [client, connected, setConfig]);

  return (
    <div className="plumbing-analyzer">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === "ai" ? "ai" : "user"}`}
          >
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}
