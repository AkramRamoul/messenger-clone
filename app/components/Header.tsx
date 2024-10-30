"use client";

import { Conversation, User } from "@prisma/client";
import useChatterName from "../hooks/useChatterName";
import { useMemo } from "react";

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
      <div className="flex gap-3 items-center">kvmkmkdmvkdvl</div>
    </div>
  );
}

export default Header;
