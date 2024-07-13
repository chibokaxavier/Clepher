"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "",
    },
    {
      name: "Socials",
      path: "",
    },
    {
      name: "FAQ",
      path: "",
    },
    {
      name: "Support",
      path: "",
    },
  ];
  const pathName = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathName &&
              "text-green-600 border-b-2 border-green-600"
            } capitalize  hover:text-green-600 transition-all font-semibold text-lg`}
          >
            {" "}
            {link.name}{" "}
          </Link>
        );
      })}{" "}
    </nav>
  );
};

export default Nav;
