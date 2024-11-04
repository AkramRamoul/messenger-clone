import { getCurrentUser } from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    const { id } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unautherized", { status: 401 });
    }
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });
    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error(error, "error delete conversation");
    return new NextResponse("internal erroe", { status: 500 });
  }
};
