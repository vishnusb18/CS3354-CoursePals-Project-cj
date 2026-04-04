import React from "react";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`rounded-lg px-4 py-2 max-w-xs ${isOwn ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}>
        <div className="text-sm">{message.content}</div>
        <div className="text-xs text-gray-400 mt-1 text-right">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    </div>
  );
}
