"use client";

import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarNavItem = ({
  item,
  isExpanded,
}: {
  item: any;
  isExpanded: boolean;
}) => {
  const pathname = usePathname();
  const isCurrentRoute = pathname?.split("/").at(-1) === `${item.name}`;
  return (
    <Tooltip
      classNames={{
        base: "",
        content: "bg-primary text-white",
        arrow: " bg-primary accent-primary",
      }}
      placement="right"
      content={item.name.replace(/-/g, " ")}
      showArrow
      isDisabled={isExpanded ? true : false}
      key={`${item.name}`}
    >
      <Link
        href={`${item.name}`}
        className={` ${isCurrentRoute ? "bg-white text-black shadow-lg" : "text-stone-100 hover:bg-black/5 hover:text-white"} flex items-center justify-start text-base    py-2 gap-3 px-4 rounded-lg  transition duration-300 ease-in-out`}
      >
        <div className="text-lg">{item.icon}</div>
        <span
          className={`${isExpanded ? "" : "text-transparent "}  capitalize text-nowrap`}
        >
          {item.name}
        </span>
      </Link>
    </Tooltip>
  );
};

export default SidebarNavItem;
