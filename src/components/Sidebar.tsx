"use client";
import React, { useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaEnvelopeOpenText,
  FaUserCircle,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import SidebarNavItem from "./SidebarNavItem";

import { BsArrowsCollapseVertical } from "react-icons/bs";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarVariants = {
    collapsed: { width: 64 },
    expanded: { width: [64, 300] },
  };
  const menu = [
    { name: "dashboard", icon: <FaHome /> },
    {
      name: "challenges",
      icon: <FaUserFriends />,
    },
    {
      name: "charity",
      icon: <FaEnvelopeOpenText />,
    },
    {
      name: "marketplace",
      icon: <FaDollarSign />,
    },
  ];
  const account = [
    {
      name: "my-account",
      icon: <FaUserCircle />,
    },
    { name: "cart", icon: <FaShoppingCart /> },
  ];

  return (
    <motion.aside
      className={`h-screen max-h-screen max-w-[25rem] min-w-[4rem] w-full  bg-stone-700 text-white relative `}
      variants={sidebarVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <div className=" overflow- h-full">
        <div className="w-full  flex flex-col justify-between bg-stone-700 gap-3 z-20 ">
          {" "}
          <div className="text-black text-start py-5 px-3 border-white">
            <div
              className={`flex ${isExpanded ? "items-start" : "items-center"} w-full`}
            >
              <Link
                href="/"
                className={`text-2xl font-bold text-coral-200 ${isExpanded ? "" : "mx-auto"}`}
              >
                <div className="flex items-center gap-2 ">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-transparent mx-auto"
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
                  {isExpanded && (
                    <h1 className="relative font-bold text-center bg-gradient-to-r from-cyan-300 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      BaseFit
                    </h1>
                  )}{" "}
                </div>
              </Link>
            </div>
          </div>
          <hr
            className={`${isExpanded ? "w-[90%]" : "w-full"}  mx-auto accent-slate-500`}
          />
          <div className="flex flex-col gap-1 p-1 px-2">
            <span
              className={`${isExpanded ? "text-stone-200" : "text-transparent"} px-1 select-none transition duration-300 ease-in-out uppercase text-xs `}
            >
              Menu
            </span>
            <div className=" w-full gap-1 flex flex-col">
              {menu.map((item) => (
                <SidebarNavItem item={item} isExpanded={isExpanded} />
              ))}
            </div>
          </div>
          <hr
            className={`${isExpanded ? "w-[90%]" : "w-full"}  mx-auto accent-slate-500`}
          />{" "}
          <div className="flex flex-col gap-1 p-1 px-2">
            <span
              className={`${isExpanded ? " text-stone-200" : "text-transparent"} px-1 select-none transition duration-300 ease-in-out uppercase text-xs `}
            >
              Accounts
            </span>{" "}
            <div className=" w-full gap-1 flex flex-col">
              {account.map((item) => (
                <SidebarNavItem item={item} isExpanded={isExpanded} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute z-10   bottom-1/2 top-1/2 my-auto right-0 translate-x-full">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-stone-500  text-white p-1 py-4  rounded-r cursor-pointer transition ease-in-out duration-250 "
          >
            {isExpanded ? <RiExpandLeftLine /> : <RiExpandRightLine />}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
