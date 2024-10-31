"use client";

import { Conversation, User } from "@prisma/client";
import useChatterName from "../hooks/useChatterName";
import { useMemo } from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

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
    <div className="bg-white flex justify-between shadow-sm items-center border-b sm:px-4 py-3 px-4 lg:px-8 w-full">
      <Link
        href="/conversation"
        className="lg:hidden block hover:text-sky-600 text-sky-500 cursor-pointer"
      >
        <HiChevronLeft size={32} />
      </Link>
    </div>
  );
}

export default Header;
