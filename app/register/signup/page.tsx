"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";

// Step 1 schema: email only
const emailSchema = z.object({
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
});

// Step 2 schema: password + confirmPassword
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function MultiStepForm() {
  const [step, setStep] = useState(1); // Track current step

  // State for storing data across steps
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // -------- Step 1: Get Email --------
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: formData.email },
  });

  // -------- Step 2: Get Password --------
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  const handleNext = () => {
    if (step === 1) {
      emailForm.handleSubmit((data) => {
        // Save email to formData
        setFormData({ ...formData, email: data.email });
        setStep(2);
      })();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    passwordForm.handleSubmit((data) => {
      // Save password and confirmPassword
      setFormData({
        ...formData,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      // You can now send formData to your API
      console.log("All data:", { ...formData, ...data });
    })();
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen">
      <h1 className="text-[#3FA3FF] text-5xl uppercase font-monoton py-4 mb-8">
        tasque <span className="text-black">app</span>
      </h1>

      {step === 1 && (
        <Form {...emailForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-8 w-full max-w-[600px] mx-4"
          >
            <h2 className="font-bold text-2xl text-center">Enter your email</h2>
            <FormField
              control={emailForm.control}
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
            <Button type="submit" className="w-full py-8 text-xl capitalize">
              continue
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...passwordForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-8 w-full max-w-[600px] mx-4"
          >
            <h2 className="font-bold text-2xl text-center">
              Set your password
            </h2>
            <FormField
              control={passwordForm.control}
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

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="border border-[#E6E6E6] py-8 text-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex-1/2 justify-between gap-2 space-y-2">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full py-8 text-xl"
              >
                Back
              </Button>
              <Button type="submit" className="w-full py-8 text-xl capitalize">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
