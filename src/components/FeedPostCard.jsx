import React from "react";

export default function FeedPostCard({ post, author, onAttachmentClick }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="font-semibold">{author.name}</div>
        <div className="text-xs text-gray-400">{new Date(post.timestamp).toLocaleString()}</div>
      </div>
      <div className="mb-2">{post.content}</div>
      {post.attachments && post.attachments.length > 0 && (
        <div className="flex gap-2 mt-2">
          {post.attachments.map((att, idx) => (
            <button
              key={idx}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
              onClick={() => onAttachmentClick(att)}
            >
              {att.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
