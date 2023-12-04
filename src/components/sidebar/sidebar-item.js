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
    ? "bg-blue-200 hover:bg-blue-200"
    : "hover:bg-gray-200";

  return (
    <Link
      href={href}
      passHref
      className={`flex items-center gap-2 w-full p-2 rounded-lg cursor-pointer transition-all ease-in-out ${activeStyle}`}
      onClick={handleClick}
    >
      {icon}
      <span
        className={`font-normal text-base ${
          isActive ? "text-blue-600" : "text-gray-900"
        }`}
      >
        {title}
      </span>
    </Link>
  );
};
