'use client'

import AdminLayout from "@/components/layouts/AdminLayout"
import AdminProducts from "@/components/pages/AdminProducts"

export default function AdminProductsPage(){
    return(<AdminLayout title="Products">
        <AdminProducts/>
    </AdminLayout>)
}