import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
        <Navbar/>
        <div className="mt-16">
        <Outlet/>
        </div>

    </>
  )
}
