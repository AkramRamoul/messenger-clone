import { Card } from "@/components/ui/card";
import { SettingsForm } from "../components/SettingsForm";
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  return (
    <Card
      className="container mx-auto sm:px-6 
        lg:px-8 lg:py-6 max-w-md h-full flex justify-center w-full flex-col"
    >
      <SettingsForm />
    </Card>
  );
}
