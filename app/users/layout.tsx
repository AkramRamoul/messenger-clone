import SideBar from "../components/sidebar/SideBar";
import { getUsers } from "../action/getUsers";
import UserList from "../components/UserList";

async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full ">
        <UserList users={users} />
        {children}
      </div>
    </SideBar>
  );
}

export default UsersLayout;
