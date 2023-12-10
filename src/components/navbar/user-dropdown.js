import React from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
  Avatar,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export const UserDropdown = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <Dropdown className="mt-2">
      <DropdownTrigger>
        <button className="flex items-center justify-center">
          <Avatar
            showFallback
            className="w-6 h-6 md:w-9 md:h-9 text-tiny"
            src="https://images.unsplash.com/broken"
            classNames={{
              base: "bg-[#4e8ce4]",
              icon: "text-white",
            }}
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
        className="text-[#BBBBBB]"
      >
        <DropdownSection
          title="User"
          className="border-b-1 border-[#555555] pb-2"
        >
          <DropdownItem key="profile" css={{ height: "$18" }}>
            <div className="text-[#AAAAAA]">
              Signed in as <br />{" "}
              <strong className="text-[#666666]">
                {session?.user?.firstName} {session?.user?.lastName}
              </strong>
            </div>
          </DropdownItem>
          <DropdownItem key="help_and_feedback" className="text-[#888888]">
            Help & Feedback
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Account" className="text-white">
          <DropdownItem
            key="logout"
            withDivider
            color="danger"
            className="text-[#ff0000]"
            onClick={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
