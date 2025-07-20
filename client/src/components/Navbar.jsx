"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
// import Logo from "../../public/Logo";

export default function Navbar() {
  return (
    <header
      className="
        w-[90%]           /* phones */
        sm:w-[90%]       /* ≥640 px */
        md:w-4/5         /* ≥768 px */
        lg:w-3/5         /* ≥1024 px */
        xl:w-1/2         /* ≥1280 px */
        mx-auto rounded-b-2xl px-4 py-3
        dark:bg-card bg-card border-b shadow-sm
        sticky top-0 z-50
      "
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xl flex flex-row items-center gap-3 font-semibold"
        >
          {/* <Logo /> */}
          MNISTic
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            Predict
          </Link>
          <Link
            href="https://www.linkedin.com/posts/tyagi-devansh_machinelearning-nextjs-fastapi-activity-7352547815731990528-cKMI"
            target="_blank"
            className="text-sm font-medium hover:underline"
          >
            Demo
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </nav>

        {/* Desktop ModeToggle */}
        <div className="hidden md:flex">
          <ModeToggle />
        </div>

        {/* Mobile nav trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                {/* hamburger icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="
                w-3/5       /* phones */
                xs:w-3/5
                sm:w-2/5
                md:w-1/3
              "
            >
              <nav className="flex flex-col items-center gap-8 mt-20">
                <Link href="/" className="text-sm font-medium hover:underline">
                  Predict
                </Link>
                <Link
                  href="https://www.linkedin.com/posts/tyagi-devansh_tensorflowjs-machinelearning-neuralnetworks-activity-7339620891867172865-I3LN"
                  target="_blank"
                  className="text-sm font-medium hover:underline"
                >
                  Demo
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:underline"
                >
                  About
                </Link>

                {/* Mobile ModeToggle */}
                <div className="md:hidden">
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
