"use client";

import DashboardCard from "../ui/DashboardCard";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CubeIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        setOrderCount(data.orders);
        setProductCount(data.products);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {/* Dashboard Cards */}
      <div className="flex gap-3 w-full">
        <DashboardCard title={"Orders"} content={orderCount} icon={<DocumentChartBarIcon className="size-6 text-gray-500"/>} />
        <DashboardCard title={"Products"} content={productCount} icon={<CubeIcon className="size-6 text-teal-600"/>} />
      </div>
    </div>
  );
}
