"use client";

import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
type Variant = "LOGIN" | "REGISTER";

function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const toggle_Variant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    if (variant === "REGISTER") {
      axios.post("/api/register", data);
    }
    if (variant === "LOGIN") {
      console.log("axios login");
    }
  };
  const socialSignIn = (action: string) => {
    setIsloading(true);
    console.log("social media signin");
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          )}
          <Input
            label="Email"
            disabled={isLoading}
            type="email"
            id="email"
            register={register}
            errors={errors}
          />
          <Input
            label="Password"
            disabled={isLoading}
            type="password"
            id="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 ">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2 ">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialSignIn("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialSignIn("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to messenger ? "
              : "Alredy have an account ?"}
          </div>
          <div onClick={toggle_Variant} className="underline cursor-pointer  ">
            {variant === "LOGIN" ? "Sign Up" : "Log in"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
