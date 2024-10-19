"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import SignupButton from "./SignupButton";
import LoginButton from "./LoginButton";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";

const AppNavbar = () => {
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`block w-full text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
          isActive ? "border-l-4 border-coral-500 bg-gray-700" : ""
        }`}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-coral-200">
              BaseFit
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/challenges">Challenges</NavLink>
              <NavLink href="/marketplace">Marketplace</NavLink>
              <NavLink href="/charity">Charity</NavLink>
              <NavLink href="/user">User</NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            {address ? (
              <UserAvatar />
            ) : (
              <div className="flex items-center gap-3">
                <SignupButton />
                <LoginButton />
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/challenges">Challenges</NavLink>
              <NavLink href="/marketplace">Marketplace</NavLink>
              <NavLink href="/charity">Charity</NavLink>
              <NavLink href="/user">User</NavLink>
              {address ? (
                <div className="mt-4  pl-3 lg:pl-0">
                  <UserAvatar />
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4 w-full pl-3 lg:pl-0">
                  <SignupButton />
                  <LoginButton />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AppNavbar;
