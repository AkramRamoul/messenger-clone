import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full justify-center flex-col py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="48"
          width="48"
          src="/images/messenger.png"
          className="mx-auto w-auto"
        />
        <h2 className="text-3xl mt-6 text-center font-bold tracking-tight text-gray-900">
          {" "}
          Sign in in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
