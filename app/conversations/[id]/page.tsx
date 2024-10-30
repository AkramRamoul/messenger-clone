import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "@/app/components/Header";

interface IParams {
  id: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.id);
  const messages = await getMessages(params.id);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
      </div>
    </div>
  );
};

export default ChatId;
