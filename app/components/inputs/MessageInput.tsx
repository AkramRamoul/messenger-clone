"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete="off"
        {...register(id, { required })}
        placeholder={placeholder}
        className="
          text-black
          py-2
          px-4
          bg-neutral-100 
          font-normal
          w-full 
          rounded-full
          focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
