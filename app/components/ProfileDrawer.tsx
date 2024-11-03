"use client";
import { Conversation, User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import useChatterName from "../hooks/useChatterName";
import { format } from "date-fns/format";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

function ProfileDrawer({ isOpen, onClose, data }: ProfileDrawerProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useChatterName(data);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  return <div>ProfileDrawer</div>;
}

export default ProfileDrawer;
