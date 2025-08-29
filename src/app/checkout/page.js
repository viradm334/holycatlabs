'use client'

import CustomerLayout from "@/components/layouts/CustomerLayout"
import UserCheckout from "@/components/pages/UserCheckout"

export default function Checkout(){
    return(<CustomerLayout>
        <UserCheckout/>
    </CustomerLayout>)
}