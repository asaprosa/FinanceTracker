"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

function SideNav() {
  const params=usePathname();

  useEffect(() => {
      
  },[params])
  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutGrid,
      path:'/dashboard'
    },
    {
      id:2,
      name:'Budget',
      icon:PiggyBank,
      path:'/dashboard/budgets'
    },
    {
      id:3,
      name:'Expenses',
      icon:ReceiptText,
      path:'/dashboard/expenses'
    },
    {
      id:4,
      name:'Upgrade',
      icon:ShieldCheck,
      path:'/dashboard/upgrade'
    }
  ]
  return (
    <div className='h-screen p-8   border shadow-sm'>
      <Image
        src="/logo.svg" // Only for testing purposes, though it shouldn't be needed
        alt="logo"
        width={80}
        height={60}
        className='ml-4 '
      />
      <div className='mt-10'>
        {menuList.map((menu) =>(
          <div key={menu.id}>
            <Link href={menu.path}><h2 className={`flex items-center font-bold space-x-1 gap-3 p-5 cursor-pointer text-primary rounded-md hover:text-primary hover:bg-blue-300 ${params==menu.path && ' bg-blue-200 ' }`}>
          < menu.icon/>
           {menu.name}</h2></Link>
          </div>
          
        ))}
      </div>
      
    </div>
  )
}

export default SideNav