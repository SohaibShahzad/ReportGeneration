import React from "react";
// import NextLink from 'next/link';
import Link from "next/link";
import { useSidebarContext } from "../layout/layout-context";

export const SidebarItem = ({ icon, title, isActive, href = "" }) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };

  const activeStyle = isActive
    ? "bg-[#00204d]"
    : "hover:bg-[#1a79ff]";

  return (
    <Link
      href={href}
      passHref
      className={`flex items-center gap-4 w-full py-3 px-8 cursor-pointer transition-all ease-in-out ${activeStyle}`}
      onClick={handleClick}
    >
      {icon}
      <span
        className={`text-white font-bold`}
      >
        {title}
      </span>
    </Link>
  );
};

// ${isActive ? "text-blue-600" : "text-gray-900"}
