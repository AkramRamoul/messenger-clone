import { Card } from "@/components/ui/card";
import { getCurrentUser } from "../action/getCurrentUser";
import { SettingsForm } from "../components/SettingsForm";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>User not found or not authenticated.</p>;
  }

  return (
    <Card
      className="container mx-auto sm:px-6 
        lg:px-8 lg:py-6 max-w-md h-full flex justify-center w-full flex-col"
    >
      <SettingsForm name={currentUser.name} photo={currentUser.image} />
    </Card>
  );
}
