"use client";
import React, { useCallback } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";

import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "src/lib/redux/hooks";

export default function UserMenuDropdown() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.userSlice);
  const router = useRouter();

  const handleActions = useCallback(
    (key: string) => {
      switch (key) {
        case "help_and_feedback":
          break;
        case "logout":
          console.log("logout");
          break;
        case "profile":
          router.push(`/${pathname?.split("/")[1]}/profile`);
          break;
        default:
          break;
      }
    },
    [pathname, router]
  );

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src:
                user?.profileImage ||
                `https://i.pravatar.cc/150?u=a042581f4e29026024d`,
            }}
            className="transition-transform scale-[90%] md:scale-[100%]"
            classNames={{
              name: "hidden md:block",
              description: "hidden md:block",
            }}
            description={user?.email as string}
            name={user?.name as string}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          onAction={(key: any) => handleActions(key)}
        >
          <DropdownItem key="profile" className="">
            profile
          </DropdownItem>

          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
