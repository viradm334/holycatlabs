'use client'

import CustomerLayout from "@/components/layouts/CustomerLayout";
import UserOrders from "@/components/pages/UserOrders";

export default function CustomerOrdersPage(){
    return(<CustomerLayout>
        <UserOrders/>
    </CustomerLayout>)
}