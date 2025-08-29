"use client";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { useState } from "react";
import PasswordInput from "../ui/PasswordInput";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${data.message}`);
        setFormData({
          email: "",
          password: "",
        });

        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };
  
  return (
    <form className="flex flex-col p-10 bg-white shadow-sm rounded gap-3 w-1/3" onSubmit={handleSubmit}>
      <h4 className="text-teal-600 font-semibold text-2xl text-center">
        Login
      </h4>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-teal-600 text-sm">Email</label>
        <Input
          name={"email"}
          value={formData.email}
          type={"text"}
          placeholder={"Enter your email here"}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <label className="font-semibold text-teal-600 text-sm">Password</label>
        <PasswordInput
          name={"password"}
          showPassword={showPassword}
          value={formData.password}
          onChange={handleChange}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <p className="font-medium mb-1 text-sm text-gray-500">
        Don&apos;t have an account yet?
        <Link
          href={"/register"}
          className="font-medium text-sm text-teal-600 underline ml-1"
        >
          Register
        </Link>
      </p>

      <Button variant={"primary"} text={"Login"} type="submit" />
    </form>
  );
}
