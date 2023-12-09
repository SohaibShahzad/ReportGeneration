import React from "react";
import { FaGithub, FaSearch } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { BurgerButton } from "./burger-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

export const NavbarWrapper = ({ children }) => {
  const collapseItems = [
    // ... your items
  ];

  return (
    <div className="font-worksans">
      <div className="border-b-2 border-[#bcd4f5] mr-2 md:mr-4 ml-2">
        <nav className="px-2 md:px-5 flex justify-between w-full py-4">
          <div className="md:hidden flex">
            <BurgerButton />
          </div>
          <div className="relative flex items-center w-full mr-6">
            <FaSearch className="absolute ml-5 w-6 h-6 text-[#bcd4f5]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-14 pr-3 rounded-full bg-[#F5F9FD] placeholder:text-[#bcd4f5] text-[#4e8ce4] focus:outline-[#7aa9eb]"
            />
          </div>
          <div className="flex items-center gap-1 md:gap-6">
            {/* <span className="flex items-center gap-2">
            <HiSpeakerphone className="w-5 h-5 text-[#AAAAAA]" />
            <span>Feedback?</span>
          </span> */}
            <NotificationsDropdown />
            <MdContactSupport className="w-7 h-7 text-[#4e8ce4]" />
            {/* <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-5 h-5 text-[#bcd4f5]" />
            </a> */}
            <UserDropdown />
          </div>
        </nav>
      </div>
      <div className="m-2 pr-2 text-[#06367A]">{children}</div>
    </div>
  );
};
