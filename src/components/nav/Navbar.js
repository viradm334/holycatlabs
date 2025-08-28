"use client";

import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="shadow-md sticky top-0 px-5 py-2 flex justify-between bg-white">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.jpg"} height={40} width={40} alt="logo" />
        <span className="text-xl text-teal-600 font-semibold">Holycatlabs</span>
      </div>
      {/* Items */}
      <ul className="flex gap-3 items-center font-semibold text-teal-600">
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <ShoppingCartIcon className="size-6" />
        </li>
      </ul>
    </div>
  );
}
