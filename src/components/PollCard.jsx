import React from "react";

export default function PollCard({ poll, onVote }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border mb-4">
      <div className="font-semibold mb-2">{poll.question}</div>
      <div className="flex flex-col gap-2">
        {poll.options.map((opt) => (
          <button
            key={opt.id}
            className={`px-3 py-1 rounded border flex justify-between items-center ${poll.voted ? "bg-gray-100 text-gray-400" : "bg-primary text-white"}`}
            onClick={() => !poll.voted && onVote(opt.id)}
            disabled={poll.voted}
          >
            <span>{opt.text}</span>
            <span className="ml-2 text-xs">{opt.votes} votes</span>
          </button>
        ))}
      </div>
    </div>
  );
}
