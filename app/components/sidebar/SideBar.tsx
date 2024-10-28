import React from "react";
import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";
import { getCurrentUser } from "@/app/action/getCurrentUser";

async function SideBar({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSideBar currentUser={user!} />
      <MobileSideBar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SideBar;
