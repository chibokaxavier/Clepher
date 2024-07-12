"use client";
import Link from "next/link";
import React from "react";
import Nav from "@/components/Nav";

const Header = () => {
  return (
    <header className="py-8 xl:py-8 sticky top-0 z-30 bg-white ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold text-green-600">
            Clepher<span className="text-accent">.</span>
          </h1>
        </Link>
        <div className="hidden xl:flex gap-8 justify-center items-center">
          <Nav />
        </div>
        <div className="xl:hidden">
          {/* <MobileNav /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
