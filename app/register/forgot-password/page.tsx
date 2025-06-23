"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { forgotPasswordSchema } from "@/formSchema";

export default function ForgotPassword() {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = async (data: { email: string }) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error");

      toast.success("Password reset link sent!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 w-full max-w-md border p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <Input {...form.register("email")} placeholder="Email" />
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
