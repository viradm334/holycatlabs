"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/handleLogout";
import {
  ArrowLeftStartOnRectangleIcon,
  UsersIcon,
  ShoppingBagIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-1/6 bg-white text-gray-800 min-h-screen pt-3 shadow-2xl">
      <ul className="px-2">
        <li className="font-medium px-3 py-2">
          <Link href={"/admin"} className="flex items-center gap-2 mb-3">
            <Image src={"/logo.jpg"} width={50} height={50} alt="logo" />
            <span className="text-xl text-teal-600 font-semibold">
              Holycatlabs
            </span>
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-200">
          <Link href={"/admin"} className="flex items-center gap-4 mb-1.5">
            <HomeIcon className="size-5" />
            Home
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-200">
          <Link
            href={"/admin/products"}
            className="flex items-center gap-4 mb-1.5"
          >
            <ShoppingBagIcon className="size-5" />
            Products
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-200">
          <Link
            href={"/admin/users"}
            className="flex items-center gap-4 mb-1.5"
          >
            <UsersIcon className="size-5" />
            Users
          </Link>
        </li>
        <li className="font-medium  px-3 py-2 hover:bg-gray-200">
          <button
            type="button"
            onClick={() => handleLogout(router)}
            className="flex items-center gap-4 mb-1.5 cursor-pointer w-full"
          >
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
