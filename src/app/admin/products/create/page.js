'use client'

import AdminLayout from "@/components/layouts/AdminLayout"
import CreateProductForm from "@/components/forms/CreateProductForm"

export default function CreateProductPage(){
    return(<AdminLayout title="Add New Product">
        <CreateProductForm/>
    </AdminLayout>)
}