"use client";
import Link from "next/link";
import React from "react";
import Nav from "@/components/Nav";
import { CiFries, CiMenuFries } from "react-icons/ci";

const Header = () => {
  return (
    <header className="py-8 xl:py-8 sticky top-0 z-30 bg-white px-5 xl:px-20">
      <div className="  flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold text-green-600">
            Clepher<span className="text-accent">.</span>
          </h1>
        </Link>
        <div className="hidden xl:flex gap-8 justify-center items-center">
          <Nav />
        </div>
        <div className="xl:hidden">
          <CiMenuFries className="text-3xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
