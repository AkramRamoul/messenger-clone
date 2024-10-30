import prisma from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";
import getSession from "./getSession";

export const getConversations = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};
