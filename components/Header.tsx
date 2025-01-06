import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
export default function Header() {
  return (
    <ClerkProvider>
      <header className="w-full flex justify-center items-center px-16 py-4 text-sm tracking-normal leading-4 capitalize whitespace-nowrap blue-bg max-md:px-5">
        <div className="relative flex gap-5 justify-between ml-20 w-full max-md:flex-wrap items-center">
          <Link href="/SearchPage">
            <span className="text-slate-300 text-5xl">Tt</span>
          </Link>

          <div className="flex gap-5 justify-between max-md:hidden items-center">
            <Link
              className="text-slate-300"
              href="/SearchPage"
              aria-label="Search"
            >
              Search
            </Link>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </ClerkProvider>
  );
}
