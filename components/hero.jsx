"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("rotate-x-0", "translate-y-10");
        imageElement.classList.remove("rotate-x-[15deg]");
      } else {
        imageElement.classList.remove("rotate-x-0", "translate-y-10");
        imageElement.classList.add("rotate-x-[15deg]");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-40 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] font-extrabold tracking-tighter pr-2 pb-6 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">
            Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="mt-5 md:mt-0" style={{ perspective: "1000px" }}>
          <div
            ref={imageRef}
            className="transition-transform duration-500 will-change-transform rotate-x-[15deg] scale-100"
          >
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;