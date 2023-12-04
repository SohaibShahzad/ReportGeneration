import React from "react";
import { FaGithub } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { BurgerButton } from "./burger-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

export const NavbarWrapper = ({ children }) => {
  const collapseItems = [
    // ... your items
  ];

  return (
    <div>
      <nav className="px-5 border-b border-[#333333] flex justify-between w-full bg-black py-4">
        <div className="md:hidden flex">
          <BurgerButton />
        </div>
        <div className="relative flex items-center w-full mr-6">
          <LuSearch className="absolute ml-3 text-gray-600" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-3 rounded-lg bg-[#16181A] placeholder:text-[#757575] text-white"
          />
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <HiSpeakerphone className="w-5 h-5 text-[#AAAAAA]" />
            <span>Feedback?</span>
          </span>
          <NotificationsDropdown />
          <MdContactSupport className="w-5 h-5 text-[#AAAAAA]" />
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5 text-[#AAAAAA]" />
          </a>
          <UserDropdown />
        </div>
      </nav>
      {children}
    </div>
  );
};
