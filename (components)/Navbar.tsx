"use client";
// This file is part of the Next.js project and is used to create a navigation bar component
import React from "react";
import Link from "next/link";
import { HomeIcon, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between gap-4 p-4 w-full ">
      <Link href="/" className="text-white">
        <HomeIcon className="w-8 h-8 cursor-pointer" />
      </Link>
      <Link href="/register" className="text-white">
        <User className="w-8 h-8 cursor-pointer" />
      </Link>
    </nav>
  );
}
