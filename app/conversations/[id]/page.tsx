import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import Body from "@/app/components/messages/Body";
import EmptyState from "@/app/components/EmptyState";
import Form from "@/app/components/messages/Form";
import Header from "@/app/components/messages/Header";

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
        <Body intialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
