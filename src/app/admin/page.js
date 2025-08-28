'use client'

import AdminLayout from "@/components/layouts/AdminLayout"
import AdminDashboard from "@/components/pages/AdminDashboard"

export default function AdminHome(){
    return(<AdminLayout>
        <AdminDashboard/>
    </AdminLayout>)
}