"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function EditProfileForm({ userId, onSuccess }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  useEffect(() => {
    fetch(`/api/user/data/${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          address: data.user.address,
          city: data.user.city,
          province: data.user.province,
          postal_code: data.user.postal_code,
        })
      );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/user/edit-profile/${userId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        if (onSuccess) onSuccess();
        window.location.reload();
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <form
      className="flex flex-col p-5 w-full h-[300px] overflow-y-auto"
      onSubmit={handleSubmit}
    >
      <label className="text-sm text-emerald-700 font-bold mb-1.5">Name</label>
      <Input
        type={"text"}
        name={"name"}
        placeholder="Enter your name here"
        value={formData?.name || ""}
        onChange={handleChange}
      />

      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Phone Number
      </label>
      <Input
        type={"text"}
        name={"phoneNumber"}
        placeholder="Enter your phone number here"
        value={formData?.phoneNumber || ""}
        onChange={handleChange}
      />

      <label className="text-sm text-emerald-700 font-bold mb-1.5">Email</label>
      <Input
        type={"email"}
        name={"email"}
        placeholder="Enter your email here"
        value={formData?.email || ""}
        onChange={handleChange}
      />

      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Address
      </label>
      <Input
        type={"text"}
        name={"address"}
        placeholder="Enter your address here"
        value={formData?.address || ""}
        onChange={handleChange}
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">City</label>
      <Input
        type={"text"}
        name={"city"}
        placeholder="Enter your city here"
        value={formData?.city || ""}
        onChange={handleChange}
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Province
      </label>
      <Input
        type={"text"}
        name={"province"}
        placeholder="Enter your province here"
        value={formData?.province || ""}
        onChange={handleChange}
      />

      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Postal Code
      </label>
      <Input
        type={"text"}
        name={"postal_code"}
        value={formData?.postal_code || ""}
        placeholder={"Enter your postal code here"}
        onChange={handleChange}
      />
      <Button variant={"primary"} type="submit" text={"Ubah Profil"} />
    </form>
  );
}
