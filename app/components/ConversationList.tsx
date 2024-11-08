"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ConversationType } from "../types";
import { useRouter } from "next/navigation";
import useConversations from "../hooks/useConversations";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./modals/GroupeChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClientt } from "../libs/pusher";
import { find } from "lodash";

const ConversationList = ({
  initialItems,
  users,
}: {
  initialItems: ConversationType[];
  users: User[];
}) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { isOpen, conversationId } = useConversations();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClientt.subscribe(pusherKey);

    const newHanlder = (conversation: ConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHandler = (conversation: ConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };
    const removeHandler = (conversation: ConversationType) => {
      setItems((current) => {
        return [
          ...current.filter(
            (currentConversation) => currentConversation.id !== conversation.id
          ),
        ];
      });
      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClientt.bind("conversation:new", newHanlder);
    pusherClientt.bind("conversation:update", updateHandler);
    pusherClientt.bind("conversation:remove", removeHandler);

    return () => {
      pusherClientt.unsubscribe(pusherKey);
      pusherClientt.unbind("conversation:new", newHanlder);
      pusherClientt.unbind("conversation:update", updateHandler);
      pusherClientt.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, router, conversationId]);
  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4 ">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 cursor-pointer text-gray-600 hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
