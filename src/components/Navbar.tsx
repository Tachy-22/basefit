"use client";
import Link from "next/link";
import LoginButton from "./LoginButton";
import React, { useEffect, useState } from "react";
import SignupButton from "./SignupButton";
import UserAvatar from "./UserAvatar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import UserMenuDropdown from "./UserMenuDropdown";

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
        className={`block w-full  hover:bg-gray-700 hover:text-white px-3 py-2 lg:rounded-md text-sm font-medium ${
          isActive
            ? "!text-coral-400 lg:border-b-4 lg:border-l-0 border-coral-500 lg:!text-coral-200"
            : "text-white"
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
              <div className="flex items-center gap-2">
                <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="text-coral-200">
                  <motion.path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M15 2C8.373 2 3 7.373 3 14s5.373 12 12 12 12-5.373 12-12S21.627 2 15 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 6v2h2V7h2v1h1v2h-1v6h1v2h-1v1h-2v-1h-2v1h-2v-1H11v-2h1v-6h-1V8h1V7h2v-1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                  <motion.path
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M15 11a3 3 0 0 1 0 6 3 3 0 0 1 0-6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                  />
                </svg>
             BaseFit
              </div>
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline gap-4">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/challenges">Challenges</NavLink>
              <NavLink href="/marketplace">Marketplace</NavLink>
              {/* <NavLink href="/charity">Charity</NavLink> */}
              <NavLink href="/waitlist">Waitlist</NavLink>
            </div>
          </div>
          <div className="hidden lg:block">
            {address ? (
              <div className="flex gap-1 items-center">
                {" "}
                <UserMenuDropdown />
                <UserAvatar />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <SignupButton />
                <LoginButton />
              </div>
            )}
          </div>
          <div className="lg:hidden">
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
            className="lg:hidden md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/challenges">Challenges</NavLink>
              <NavLink href="/marketplace">Marketplace</NavLink>
              <NavLink href="/waitlist">Waitlist</NavLink>

              {/* <NavLink href="/charity">Charity</NavLink>               <NavLink href="/user">Dashboard</NavLink>
               */}
              {address ? (
                <div className="mt-6  mx-auto w-full">
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
