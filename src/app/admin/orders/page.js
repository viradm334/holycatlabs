"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import AdminOrders from "@/components/pages/AdminOrders";
import { Suspense } from "react";

export default function AdminOrdersPage() {
  return (
    <Suspense>
      <AdminLayout title="Orders">
        <AdminOrders />
      </AdminLayout>
    </Suspense>
  );
}
