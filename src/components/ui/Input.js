"use client";

export default function Input({ name, onChange, value, placeholder, type }) {
  return (
    <input
      className="bg-white outline-1 focus:outline-teal-500 outline-gray-400 rounded p-1.5 placeholder:text-sm"
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
}
