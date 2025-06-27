"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type VerifyStatus = "verifying" | "success" | "error";

export default function VerifyEmail() {
  const [status, setStatus] = useState<VerifyStatus>("verifying");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        const res = await axios.get(`/api/verify-email?token=${token}`);
        console.log(res.data);
        if (res.status === 200) {
          setStatus("success");
          setMessage(res.data.message);
        } else {
          setStatus("error");
          setMessage(res.data.message || "Verification failed.");
        }
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;

        console.error("Verification failed:", error);
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Something went wrong during verification."
        );
      }
    }

    if (token) verify();
    else {
      setStatus("error");
      setMessage("No token provided.");
    }
  }, [token]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl p-8 shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          {status === "verifying" && "Verifying..."}
          {status === "success" && "✅ Email Verified!"}
          {status === "error" && "❌ Verification Failed"}
        </h1>
        <p className="text-gray-700 mb-6">{message}</p>

        {status === "success" && (
          <button
            onClick={() => router.push("/register/login?verified=true")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Continue to Login
          </button>
        )}
      </div>
    </div>
  );
}
