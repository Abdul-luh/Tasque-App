import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton() {
  return (
    <Button
      type="button"
      onClick={() => signIn("google")}
      className="w-full flex items-center justify-center gap-3 bg-[#f5f5f5] border border-gray-300 rounded-lg py-8 text-xl capitalize hover:bg-gray-100 transition cursor-pointer"
    >
      <Image src="/Google.png" alt="Google logo" width={20} height={20} />
      <span className="text-xl font-medium text-black">
        Continue with Google
      </span>
    </Button>
  );
}
