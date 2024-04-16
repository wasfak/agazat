"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "../../app/assets/logo.png";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Agaza",
    href: "/agaza",
  },
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return "";
  }
  return (
    <>
      <div className={`max-w-screen p-4 text-sm leading-6 text-slate-700`}>
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src={logo} alt="logo" width={40} height={40} priority />
            <span className="font-bold">Logo</span>
          </Link>
          <div className="flex items-center justify-between gap-x-4">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition duration-300 ${
                  pathname === href
                    ? "duration-400 font-semibold text-red-500"
                    : ""
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
