'use client'

import CustomerLayout from "@/components/layouts/CustomerLayout"
import UserCart from "@/components/pages/UserCart"

export default function Cart(){
    return(<CustomerLayout>
        <UserCart/>
    </CustomerLayout>)
}