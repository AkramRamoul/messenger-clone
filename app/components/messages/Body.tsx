"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessageType } from "../types";
import useConversation from "../hooks/useConversations";
import MessageBox from "./MessageBox";
import axios from "axios";

function Body({ intialMessages }: { intialMessages: MessageType[] }) {
  const [messages, setMessages] = useState(intialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24 " />
    </div>
  );
}

export default Body;
