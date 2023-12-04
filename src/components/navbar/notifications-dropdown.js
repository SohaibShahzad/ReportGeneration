import React from "react";
import { IoNotifications } from "react-icons/io5";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";

export const NotificationsDropdown = () => {
  return (
    <Dropdown className="bg-[#16181A] mt-3">
      <DropdownTrigger>
        <button className="flex items-center justify-center">
          <IoNotifications className="w-5 h-5 text-[#AAAAAA] hover:text-[#DDDDDD] duration-200" />
        </button>
      </DropdownTrigger>
      <DropdownMenu
      className="text-[#BBBBBB]"
        aria-label="Avatar Actions"
        css={{
          $$dropdownMenuWidth: "340px",
          $$dropdownItemHeight: "70px",
          "& .nextui-dropdown-item": {
            py: "$4",
            svg: {
              color: "$secondary",
              mr: "$4",
            },
            "& .nextui-dropdown-item-content": {
              w: "100%",
              fontWeight: "$semibold",
            },
          },
        }}
      >
        <DropdownSection title="Notifications">
          <DropdownItem key="notification_1">
            Edit your information
          </DropdownItem>
          <DropdownItem key="notification_2">
            Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem key="notification_3">
            New updates available
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
