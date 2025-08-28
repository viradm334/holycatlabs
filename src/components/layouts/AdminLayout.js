"use client";

import React from "react";
import Sidebar from "../nav/Sidebar";
import { useState, useEffect } from "react";

export default function AdminLayout({ title = "Dashboard", children }) {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("/api/user/me")
//       .then((res) => res.json())
//       .then((data) => setUser(data.user));
//   }, []);

//   if (!user) return null;

  return (
    <div className="flex">
      <Sidebar/>
      <main className="w-5/6 p-10 bg-white">
        <header className="mb-3">
          <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}