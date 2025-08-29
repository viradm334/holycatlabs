"use client";

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../nav/Navbar";
import Footer from "../nav/Footer";

export default function CustomerLayout({ title = "", children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
        <main className="flex-grow w-full p-4">
          {React.cloneElement(children, { user })}
        </main>
        <Footer/>
    </div>
  );
}