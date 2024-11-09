"use client";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Input from "./inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { Label } from "@/components/ui/label";

interface iAppProps {
  name: string | null;
  photo: string | null;
}

export const SettingsForm = ({ name, photo }: iAppProps) => {
  const {
    formState: { errors },
    setValue,
    watch,
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: name,
      image: photo,
    },
  });
  const image = watch("image");
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleImageUpload = async (result: any) => {
    try {
      setValue("image", result.info.secure_url, { shouldValidate: true });
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        toast.success("Profile updated successfully!");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="flex flex-col gap-y-2 text-center">
        <CardTitle>Settings</CardTitle>
        <CardDescription>Modify account information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <div className="grid gap-2">
            <Input
              disabled={isLoading}
              label="Name"
              errors={errors}
              id="name"
              register={register}
              required
            />

            <div className="mt-2 flex items-center flex-col gap-3">
              <Label htmlFor="image" className="mt-8">
                Photo
              </Label>
              <Image
                alt="User Image"
                height={64}
                width={64}
                className="rounded-full"
                src={image || photo || `https://avatar.vercel.sh/${name}`}
              />
              <CldUploadWidget
                uploadPreset="d5empqg9"
                onSuccess={handleImageUpload}
                options={{ maxFiles: 1 }}
              >
                {({ open }) => (
                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                    className="mb-4"
                  >
                    Change Image
                  </Button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-8 justify-self-center">
        <Button
          type="submit"
          disabled={isLoading}
          aria-disabled={isLoading}
          className="bg-sky-500"
        >
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </CardFooter>
    </form>
  );
};
