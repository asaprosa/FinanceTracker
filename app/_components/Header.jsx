import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="p-8 flex items-center justify-between border sh">
      <Image
        src="/logo.svg" // Only for testing purposes, though it shouldn't be needed
        alt="logo"
        width={80}
        height={60}
        className='ml-4'
      />
      <div>
      <Link href="/dashboard">
      <Button className="bg-gray-50 border text-primary mr-6" > Dashboard</Button></Link>
      <Button>Get Started</Button>
      </div>
      
    </div>
  );
}

export default Header;
