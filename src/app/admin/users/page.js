'use client'

import AdminLayout from "@/components/layouts/AdminLayout"
import AdminUsers from "@/components/pages/AdminUsers"

export default function AdminUsersPage(){
    return(<AdminLayout title="Users">
        <AdminUsers/>
    </AdminLayout>)
}