"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
interface Props {
  data: User;
}
function UserBox({ data }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log(data);
  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <div
      onClick={handleClick}
      className="w-full rounded-md transition cursor-pointer relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100"
    >
      <div className="relative inline-block">
        <Avatar>
          <AvatarImage
            src={data.image ?? `https://avatar.vercel.sh/${data.name}`}
            alt="user Image"
          />
          <AvatarFallback>{data.name}</AvatarFallback>
        </Avatar>
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-lg" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex mb-1 justify-between">
            <p className="text-sm font-medium text-gray-900 ">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
