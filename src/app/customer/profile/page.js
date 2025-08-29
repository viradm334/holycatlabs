'use client'

import CustomerLayout from "@/components/layouts/CustomerLayout"
import UserProfile from "@/components/pages/UserProfile"

export default function CustomerProfilePage(){
    return(<CustomerLayout>
        <UserProfile/>
    </CustomerLayout>)
}