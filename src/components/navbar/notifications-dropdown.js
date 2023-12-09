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
    <Dropdown className="mt-3">
      <DropdownTrigger>
        <button className="flex items-center justify-center">
          <IoNotifications className="w-6 h-6 text-[#4e8ce4] hover:text-[#1b59b1] duration-200 hover:scale-110" />
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
