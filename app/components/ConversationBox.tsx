"use client";
import { useCallback, useMemo } from "react";
import { ConversationType } from "../types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import useChatterName from "../hooks/useChatterName";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";

function ConversationBox({
  data,
  selected,
}: {
  data: ConversationType;
  selected?: boolean;
}) {
  const otherUser = useChatterName(data);
  const session = useSession();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);
  const Email = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const isseen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArr = lastMessage.seen || [];
    if (!Email) {
      return false;
    }
    return seenArr.filter((user) => user.email === Email).length != 0;
  }, [Email, lastMessage]);

  const LastMessageString = useMemo(() => {
    if (lastMessage?.image) {
      return "sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage?.body, lastMessage?.image]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
    w-full 
    relative 
    hover:bg-neutral-100
    flex 
    items-center 
    rounded-lg
    transition
    space-x-3 
    p-3 
    cursor-pointer
    `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-gray-400 font-light text-xs">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              isseen ? "text-gray-500" : "text-black font-meduim"
            )}
          >
            {LastMessageString}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;
