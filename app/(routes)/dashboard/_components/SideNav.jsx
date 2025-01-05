"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
  const params = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Budget',
      icon: PiggyBank,
      path: '/dashboard/budgets',
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses',
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade',
    },
  ];

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md bg-gray-200 md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen p-8 border shadow-sm fixed top-0 left-0 transform transition-transform duration-300 bg-white ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <Image
          src="/logo.svg"
          alt="logo"
          width={80}
          height={60}
          className="ml-4"
        />
        <div className="mt-10">
          {menuList.map((menu) => (
            <div key={menu.id}>
              <Link href={menu.path}>
                <h2
                  className={`flex items-center font-bold space-x-1 gap-3 p-5 cursor-pointer text-primary rounded-md hover:text-primary hover:bg-blue-300 ${
                    params === menu.path && 'bg-blue-200'
                  }`}
                >
                  <menu.icon />
                  {menu.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default SideNav;
