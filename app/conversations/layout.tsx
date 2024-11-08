import { getConversations } from "../action/getConversation";
import { getUsers } from "../action/getUsers";
import ConversationList from "../components/ConversationList";
import SideBar from "../components/sidebar/SideBar";
export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </SideBar>
  );
}
