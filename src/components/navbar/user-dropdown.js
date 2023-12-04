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
    <Dropdown className="bg-[#16181A] mt-2">
      <DropdownTrigger>
        <button className="flex items-center justify-center">
          <RxAvatar className="w-9 h-9 text-[#CCCCCC] hover:text-[#FFFFFF] duration-200" />
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
            <div className="text-[#666666]">
              Signed in as <br /> <strong className="">{session?.user?.name}</strong>
            </div>
          </DropdownItem>
          <DropdownItem key="settings" withDivider>
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics" withDivider>
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback" withDivider>
            Help & Feedback
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Account">
          <DropdownItem
            key="logout"
            withDivider
            color="danger"
            className="text-danger"
            onClick={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
