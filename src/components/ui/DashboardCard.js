"use client";

export default function DashboardCard({ title, content, icon }) {
  return (
    <div className="rounded p-4 w-1/4 bg-white gap-2 mr-3 outline-1 outline-gray-300 shadow-md">
      <div className="flex gap-2">
        {icon}
        <h1 className="font-bold mb-3">{title}</h1>
      </div>
      <p className="px-2">{content}</p>
    </div>
  );
}
