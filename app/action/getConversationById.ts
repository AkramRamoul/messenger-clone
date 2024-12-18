import prisma from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

const getConversationById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

export default getConversationById;
