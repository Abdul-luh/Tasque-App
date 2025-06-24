"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("verifying");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    async function verify() {
      const res = await fetch(`/api/verify-email?token=${token}`);
      if (res.ok) setStatus("success");
      else setStatus("error");
    }

    if (token) verify();
    else setStatus("error");
  }, [token]);

  return (
    <div className="h-screen flex items-center justify-center">
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && <p className="text-green-600">Email verified! 🎉</p>}
      {status === "error" && <p className="text-red-600">Invalid or expired token.</p>}
    </div>
  );
}
