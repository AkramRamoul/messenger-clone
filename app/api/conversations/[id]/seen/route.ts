import { getCurrentUser } from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export const POST = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    const currentUser = await getCurrentUser();
    const { id } = params;
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unautherized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("Internal ID", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updtaMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(updtaMessage);
  } catch (error: unknown) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
