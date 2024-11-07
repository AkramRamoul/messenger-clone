import { Card } from "@/components/ui/card";
import { getCurrentUser } from "../action/getCurrentUser";
import { SettingsForm } from "../components/SettingsForm";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.email || !currentUser?.id) {
    return null;
  }
  return (
    <div className="flex items-center justify-center mt-12">
      <Card className="w-full max-w-md h-full">
        <SettingsForm currentUser={currentUser} />
      </Card>
    </div>
  );
}
