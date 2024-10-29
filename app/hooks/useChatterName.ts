import { User } from "@prisma/client";
import { ConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useChatterName = (
  conversation:
    | ConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();
  const Chatter = useMemo(() => {
    const currUserEmail = session.data?.user?.email;
    const Chatter = conversation.users.filter(
      (user) => user.email != currUserEmail
    );
    return Chatter[0];
  }, [conversation.users, session.data?.user?.email]);
  return Chatter;
};

export default useChatterName;
