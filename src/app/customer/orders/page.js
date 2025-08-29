"use client";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import UserOrders from "@/components/pages/UserOrders";
import { Suspense } from "react";

export default function CustomerOrdersPage() {
  return (
    <Suspense>
      <CustomerLayout>
        <UserOrders />
      </CustomerLayout>
    </Suspense>
  );
}
