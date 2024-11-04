"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { LogIn, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/nav/mode-toggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex justify-between p-1 items-center shadow top-nav sticky top-0 w-full z-50 backdrop-brightness-10 dark:bg-black">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" height={50} width={50} />
      </Link>
      <div className="flex justify-end items-center gap-2">
        {isSignedIn && (
          <div className="flex gap-5 items-center justify-center">
            <Link href={"/article/create"}>
              <div className="flex gap-2 border-2 border-b-gray-400 rounded-md px-3 py-2">
                <SquarePen className="h-5 w-5" />
                <span className="text-bold text-xs md:text-md">Write</span>
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <span className="text-bold text-xs md:text-md flex items-center justify-center">
                <span className="hidden md:block">
                  {user?.fullName}&apos;s&nbsp;
                </span>{" "}
                Dashboard
              </span>
            </Link>
          </div>
        )}
        <SignedOut>
          <Button variant="ghost" className="flex items-center">
            <LogIn size={18} /> <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
      <Toaster />
    </nav>
  );
}
