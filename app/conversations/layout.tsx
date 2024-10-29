import SideBar from "../components/sidebar/SideBar";
import ConversationList from "../components/ConversationList";
import { getConversations } from "../action/getConversation";
const COnversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const Conversations = await getConversations();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={Conversations} />
        {children}
      </div>
    </SideBar>
  );
};

export default COnversationLayout;
