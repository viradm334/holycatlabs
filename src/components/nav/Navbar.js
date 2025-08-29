"use client";

import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { handleLogout } from "@/lib/handleLogout";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Navbar({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="shadow-md sticky top-0 px-5 py-2 flex justify-between bg-white z-10">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.jpg"} height={40} width={40} alt="logo" />
        <span className="text-xl text-teal-600 font-semibold">Holycatlabs</span>
      </div>
      {/* Items */}
      <ul className="flex gap-3 items-center font-semibold text-teal-600">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-teal-600 font-medium flex gap-1 items-center cursor-pointer"
            >
              <UserCircleIcon className="size-5" />
              {user.name}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-50">
                <ul className="flex flex-col text-sm text-slate-700 font-medium">
                  <Link
                    href="/user/profile"
                    className="px-4 py-2 hover:bg-slate-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/user/orders"
                    className="px-4 py-2 hover:bg-slate-100"
                  >
                    Orders
                  </Link>
                  <p
                    className="px-4 py-2 hover:bg-slate-100 text-red-500 cursor-pointer"
                    onClick={() => {
                      handleLogout(router);
                    }}
                  >
                    Logout
                  </p>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 text-teal-600 font-semibold">
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
          </div>
        )}
        <Link href={"/cart"}>
          <ShoppingCartIcon className="size-6" />
        </Link>
      </ul>
    </div>
  );
}
