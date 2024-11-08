"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessageType } from "../../types";
import useConversation from "../../hooks/useConversations";
import MessageBox from "../messages/MessageBox";
import axios from "axios";
import { pusherClientt } from "@/app/libs/pusher";
import { find } from "lodash";

function Body({ intialMessages }: { intialMessages: MessageType[] }) {
  const [messages, setMessages] = useState(intialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClientt.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: MessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: MessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClientt.bind("messages:new", messageHandler);
    pusherClientt.bind("message:update", updateMessageHandler);

    return () => {
      pusherClientt.unsubscribe(conversationId);
      pusherClientt.unbind("messages:new", messageHandler);
      pusherClientt.unbind("message:update", updateMessageHandler);
    };
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
