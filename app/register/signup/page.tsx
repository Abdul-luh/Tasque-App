"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { nameEmailSchema, passwordSchema } from "@/formSchema";
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
import React, { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1); // Track current step

  // State for storing data across steps
  const [formData, setFormData] = useState({
    email: "",
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
  });

  // -------- Step 1: Get Email --------
  const nameEmailForm = useForm({
    resolver: zodResolver(nameEmailSchema),
    defaultValues: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    },
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
    // Save email to formData
    if (step === 1) {
      nameEmailForm.handleSubmit((data) => {
        // Check if any field is empty
        if (!data.email || !data.firstName || !data.lastName) {
          alert("Please fill in all fields.");
          return;
        }
        setFormData({ ...formData, ...data });
        setStep(2);
      })();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleFinalSubmit = () => {
    passwordForm.handleSubmit(async (data) => {
      // Check if any field is empty
      if (!data.password || !data.confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      const completeFormData = { ...formData, ...data };
      setFormData(completeFormData);

      try {
        console.log("All data:", completeFormData);
        const res = await axios.post("/api/signup", completeFormData);
        alert(res.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "An error occurred");
        } else {
          alert("An unexpected error occurred");
        }
      }
    })();
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen">
      <h1 className="text-[#3FA3FF] text-5xl uppercase font-monoton py-4 mb-8">
        tasque <span className="text-black">app</span>
      </h1>

      {step === 1 && (
        <Form {...nameEmailForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-8 w-full max-w-[600px] mx-4"
          >
            <h2 className="font-bold text-2xl text-center">
              Enter your name and email
            </h2>
            <FormField
              control={nameEmailForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="firstname:John"
                      className="border border-[#E6E6E6] py-8 text-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={nameEmailForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="lastname:Doe"
                      className="border border-[#E6E6E6] py-8 text-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={nameEmailForm.control}
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
              handleFinalSubmit();
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
