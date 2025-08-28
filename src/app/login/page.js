'use client'

import AuthLayout from "@/components/layouts/AuthLayout"
import LoginForm from "@/components/forms/LoginForm"

export default function Login(){
    return(<AuthLayout>
        <LoginForm/>
    </AuthLayout>)
}