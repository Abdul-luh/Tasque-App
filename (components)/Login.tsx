"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/formSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GoogleButton from "./GoogleButton";

export default function Login() {
  // State for storing data across steps
  const [formData, setFormData] = useState({
    email: "",
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
  });

  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  useEffect(() => {
    if (verified === "true") {
      toast.success("Email verified! You can now log in.");
    }
  }, [verified]);

  // -------- Step 1: Get Email --------
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: formData.email,
      password: formData.password,
    },
  });

  const handleFinalSubmit = () => {
    loginForm.handleSubmit(async (data) => {
      // Check if any field is empty
      if (!data.password || !data.email) {
        toast.error("Please fill in all fields.");
        return;
      }

      const completeFormData = { ...formData, ...data };
      setFormData(completeFormData);

      try {
        console.log("All data:", completeFormData);
        const res = await axios.post("/api/signup", completeFormData);
        toast.success(res.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    })();
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-[#3FA3FF] text-5xl uppercase font-monoton py-4 mb-8">
        tasque <span className="text-black">app</span>
      </h1>

      <Form {...loginForm}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFinalSubmit();
          }}
          className="space-y-8 w-full max-w-[600px] mx-4"
        >
          <h2 className="font-bold text-2xl text-center">
            Enter your name and email
          </h2>

          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="email@domain.com"
                    className="border border-[#E6E6E6] py-8 text-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="border border-[#E6E6E6] py-8 text-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full py-8 text-xl capitalize">
            continue
          </Button>
        </form>
      </Form>
      <div className="w-full max-w-[600px] mx-4 mt-8 flex flex-col items-center">
        <div className="flex items-center w-full">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 font-medium uppercase">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <Link
          href="/register/forgot-password"
          type="button"
          className="my-4 text-[#3FA3FF] hover:underline text-lg font-semibold"
          onClick={() => {
            // Add your forgot password logic here
          }}
        >
          Forgot password?
        </Link>
        <GoogleButton />

        <p className="mt-6 text-center text-gray-700 text-lg">
          Don&apos;t have an account?{" "}
          <Link
            href="/register/signup"
            className="text-[#3FA3FF] hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
