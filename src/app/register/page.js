'use client'

import AuthLayout from "@/components/layouts/AuthLayout"
import RegisterForm from "@/components/forms/RegisterForm"

export default function Register(){
    return(<AuthLayout>
        <RegisterForm/>
    </AuthLayout>)
}