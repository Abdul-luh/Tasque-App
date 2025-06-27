// "use client";
import SignUpPage from "@/(components)/Signup";
import React, { Suspense } from "react";

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPage />
    </Suspense>
  );
}
