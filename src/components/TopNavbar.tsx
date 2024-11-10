"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import UserAvatar from "./UserAvatar";
import { Input } from "@nextui-org/react";

interface TopNavbarProps {
  title?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ title }) => {
  const pathname = usePathname();
  const headerTitle = pathname?.split("/").at(-1)?.replace(/-/g, " ");

  return (
    <div className="sticky top-0 w-full px-6 py-4 border-b flex justify-between items-center z-50">
      <h1 className="capitalize text-xl font-semibold text-white">
        {headerTitle}
      </h1>
      <div className="flex items-center gap-4">
        <Input
          variant="bordered"
          className="w-full max-w-64"
          placeholder="Search..."
          startContent={<FaSearch className="text-default-300" />}
        />{" "}
        <FaBell />
        <UserAvatar />
      </div>
    </div>
  );
};

export default TopNavbar;
