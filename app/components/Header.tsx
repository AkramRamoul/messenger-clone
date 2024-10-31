"use client";

import { Conversation, User } from "@prisma/client";
import useChatterName from "../hooks/useChatterName";
import { useMemo } from "react";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "./Avatar";

function Header({
  conversation,
}: {
  conversation: Conversation & {
    users: User[];
  };
}) {
  const otherUser = useChatterName(conversation);

  const StatusString = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center ">
        <Link
          href="/conversations"
          className="lg:hidden block hover:text-sky-600 transition text-sky-500 cursor-pointer"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col ">
          <div className="font-semibold">
            {conversation.name || otherUser.name}
          </div>
          <div className="font-light text-neutral-500 text-sm">
            {StatusString}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor pointer hover:text-sky-600 transition"
      />
    </div>
  );
}

export default Header;
