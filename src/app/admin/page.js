'use client'

import Button from "@/components/ui/Button"
import Navbar from "@/components/nav/Navbar"
import Footer from "@/components/nav/Footer"

export default function AdminHome(){
    return(<div>
        <Navbar/>
        <Button type={'secondary'} text={'Login'}/>
        <Footer/>
    </div>)
}