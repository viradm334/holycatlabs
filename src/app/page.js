import CustomerLayout from "@/components/layouts/CustomerLayout";
import UserHome from "@/components/pages/UserHome";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <CustomerLayout>
        <UserHome />
      </CustomerLayout>
    </Suspense>
  );
}
