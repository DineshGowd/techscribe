"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useEffect, useRef } from "react";

const scrambleText = (
  element: HTMLElement,
  finalText: string,
  duration: number
) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const scrambleInterval = 50; // Interval between character changes in milliseconds
  let iterations = (duration * 1000) / scrambleInterval;

  const scramble = () => {
    let displayedText = "";
    for (let i = 0; i < finalText.length; i++) {
      displayedText +=
        Math.random() > 0.5
          ? finalText[i]
          : chars.charAt(Math.floor(Math.random() * chars.length));
    }
    element.innerText = displayedText;
    iterations--;

    if (iterations <= 0) {
      element.innerText = finalText;
      clearInterval(interval);
    }
  };

  const interval = setInterval(scramble, scrambleInterval);
};

export default function Home() {
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (textRef1.current && textRef2.current) {
      scrambleText(textRef1.current, "TechScribe", 0.5);
      scrambleText(
        textRef2.current,
        "Techies Daily Dose of Digital Awesomeness.",
        0.5
      );
    }
  }, []);

  return (
    <div className="relative flex flex-col h-full z-10 bg-gradient-to-r from-pinkstart to-blueend">
      <div className="min-h-screen text-center p-5 flex flex-col gap-10 justify-center items-center  w-full">
        <h1
          className="font-extrabold text-5xl font-bold bg-gradient-to-r from-purple-900 via-violet-900 to-blue-900 bg-clip-text text-transparent"
          ref={textRef1}
        >
          TechScribe
        </h1>
        <p className="font-normal text-xl text-white" ref={textRef2}>
          Techies Daily Dose of Digital Awesomeness.
        </p>
        <Link href={"/articles"}>
          <Button>Let&apos;s Start Readings</Button>
        </Link>
      </div>
    </div>
  );
}
