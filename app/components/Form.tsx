"use client";
import React from "react";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import useConversation from "../hooks/useConversations";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import MessageInput from "./inputs/MessageInput";

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
    setValue("message", "", {
      shouldValidate: true,
    });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  return (
    <div
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <HiPhoto size={30} className="text-sky-500" />
      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <MessageInput
          errors={errors}
          id="message"
          register={register}
          placeholder="type a message"
          required
        />
        <button
          disabled={!message}
          type="submit"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 bg-sky-500 text-primary-foreground shadow hover:bg-sky-700 h-10 w-10"
        >
          <HiPaperAirplane height={15} width={15} />
        </button>
      </form>
    </div>
  );
}

export default Form;
