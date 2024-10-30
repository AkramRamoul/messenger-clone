import prisma from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

const getMessages = async (ConversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return [];
    }
    const messages = await prisma.message.findMany({
      where: {
        conversationId: ConversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMessages;
