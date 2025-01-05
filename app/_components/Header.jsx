"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-8 flex items-center justify-between border shadow-sm">
      {/* Logo */}
      <Image
        src="/logo.svg"
        alt="logo"
        width={80}
        height={60}
        className="ml-4"
      />

      {/* Hamburger Icon (Visible on Mobile Only) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        <Link href="/dashboard">
          <Button className="bg-gray-50 border text-primary">Dashboard</Button>
        </Link>
        <Button>Get Started</Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-8 bg-white border rounded-lg shadow-lg w-48 z-50 md:hidden">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/dashboard">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left bg-gray-50 border text-primary"
                >
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left"
              >
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Header;
