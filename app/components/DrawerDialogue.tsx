"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "../hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import Avatar from "./Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Input from "./inputs/Input";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface DesktopSideBarProps {
  currentUser: User;
}
export function DrawerDialogDemo({ currentUser }: DesktopSideBarProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar user={currentUser} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm currentUser={currentUser} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar user={currentUser} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm currentUser={currentUser} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ProfileFormProps extends React.ComponentProps<"form"> {
  currentUser: User;
}

function ProfileForm({ className, currentUser }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    setValue,
    watch,
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
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
    <div className={cn("grid items-start gap-4", className)}>
      <CldUploadWidget
        uploadPreset="d5empqg9"
        onSuccess={handleImageUpload}
        options={{ maxFiles: 1 }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            className="mb-4"
          >
            Change Profile Image
          </button>
        )}
      </CldUploadWidget>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Input
            disabled={isLoading}
            label="Name"
            errors={errors}
            id="name"
            register={register}
            required
          />
          <Label htmlFor="image">Photo</Label>
          <div className="mt-2 flex items-center gap-3">
            <Image
              alt="User Image"
              height={48}
              width={48}
              className="rounded-full"
              src={
                image ||
                currentUser?.image ||
                `https://avatar.vercel.sh/${currentUser?.name}`
              }
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          aria-disabled={isLoading}
          className="mt-6 w-full"
        >
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
