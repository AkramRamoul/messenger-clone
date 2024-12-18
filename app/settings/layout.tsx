import SideBar from "../components/sidebar/SideBar";
export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
