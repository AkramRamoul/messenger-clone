import { getConversations } from "../action/getConversation";
import ConversationList from "../components/ConversationList";
import SideBar from "../components/sidebar/SideBar";
export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
