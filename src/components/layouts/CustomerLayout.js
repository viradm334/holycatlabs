"use client";

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../nav/Navbar";
import Footer from "../nav/Footer";

export default function CustomerLayout({ title = "", children }) {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("/api/auth/me")
//       .then((res) => res.json())
//       .then((data) => setUser(data.user));
//   }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <main className="flex-grow w-full p-6">
          <header className="mb-6 px-3">
            <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
          </header>
          {React.cloneElement(children, { user })}
        </main>
        <Footer/>
    </div>
  );
}