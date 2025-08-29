'use client'

import AdminLayout from "@/components/layouts/AdminLayout"
import AdminOrders from "@/components/pages/AdminOrders"

export default function AdminOrdersPage(){
    return(<AdminLayout title="Orders">
        <AdminOrders/>
    </AdminLayout>)
}