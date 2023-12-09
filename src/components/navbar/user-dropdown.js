import React from "react";
import { RxAvatar } from "react-icons/rx";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
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
          <RxAvatar className="w-9 h-9 text-[#4e8ce4] hover:text-[#1b59b1] duration-200 hover:scale-110" />
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
              Signed in as <br /> <strong className="text-[#666666]">{session?.user?.firstName} {" "} {session?.user?.lastName}</strong>
            </div>
          </DropdownItem>
          {/* <DropdownItem key="settings" className="text-[#666666]">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings" className="text-[#666666]">Team Settings</DropdownItem> */}
          {/* <DropdownItem key="analytics" className="text-[#666666]">
            Analytics
          </DropdownItem>
          <DropdownItem key="system" className="text-[#666666]">System</DropdownItem>
          <DropdownItem key="configurations" className="text-[#666666]">Configurations</DropdownItem> */}
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
