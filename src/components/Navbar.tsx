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
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-transparent"
                >
                  <motion.path
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M15 5a10 10 0 1 0 0 20 10 10 0 0 0 0-20"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M10 15h10M15 10v10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                  <motion.path
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M12 12l6 6M18 12l-6 6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient
                      id="logoGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" style={{ stopColor: "#67e8f9" }} />
                      <stop offset="50%" style={{ stopColor: "#a855f7" }} />
                      <stop offset="100%" style={{ stopColor: "#ec4899" }} />
                    </linearGradient>
                  </defs>
                </svg>
                <h1 className="relative font-bold text-center bg-gradient-to-r from-cyan-300 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  BaseFit
                </h1>{" "}
              </div>
            </Link>
          </div>
          {/* <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline gap-4">
              <NavLink href="/waitlist">Waitlist</NavLink>
            </div>
          </div> */}

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
              {/*    <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/challenges">Challenges</NavLink>
              <NavLink href="/marketplace">Marketplace</NavLink>
              <NavLink href="/waitlist">Waitlist</NavLink>

              <NavLink href="/charity">Charity</NavLink>               <NavLink href="/user">Dashboard</NavLink>
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
