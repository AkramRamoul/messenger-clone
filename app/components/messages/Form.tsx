"use client";
import React from "react";
import useConversation from "../../hooks/useConversations";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import MessageInput from "../inputs/MessageInput";
import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon } from "lucide-react";
import { IoPaperPlane } from "react-icons/io5";

function Form() {
  const { conversationId } = useConversation();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");

  const OnSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationId });
  };
  /* eslint-disable  @typescript-eslint/no-explicit-any */

  const handleImageUpload = (res: any) => {
    if (res?.info?.secure_url) {
      axios.post("/api/messages", {
        image: res.info.secure_url,
        conversationId,
      });
    } else {
      console.error("Image upload failed");
    }
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadWidget
        uploadPreset="d5empqg9"
        onSuccess={handleImageUpload}
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()}>
              <ImageIcon size={28} className="text-sky-500" />
            </button>
          );
        }}
      </CldUploadWidget>

      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <MessageInput
          errors={errors}
          id="message"
          register={register}
          placeholder="Type a message or upload an image"
          required
        />
        <button
          disabled={!message}
          type="submit"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 bg-sky-500 text-primary-foreground shadow hover:bg-sky-700 h-10 w-10"
        >
          <IoPaperPlane height={15} width={15} />
        </button>
      </form>
    </div>
  );
}

export default Form;
