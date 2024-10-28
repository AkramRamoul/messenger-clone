import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useConversations from "./useConversations";

const useRoutes = () => {
  const pathname = usePathname();
  const { convId } = useConversations();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversation" || !!convId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, convId]
  );
  return routes;
};

export default useRoutes;
