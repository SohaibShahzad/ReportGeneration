import React from "react";
import { useRouter } from "next/router";
import { Avatar, Tooltip } from "@nextui-org/react";
import { FaGear } from "react-icons/fa6";
import { SidebarItem } from "./sidebar-item";
import { FaHome } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";

import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { CollapseItems } from "./collapse-items";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={`fixed inset-0 z-20 ${
        collapsed ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 `}
    >
      {collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={setCollapsed}
        />
      )}

      <div className="bg-black dark:bg-gray-800 h-full w-64 flex-shrink-0 border-r border-[#333333] dark:border-gray-700 p-4 flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-4 mt-4 p-2">
            {/* Sidebar Items Here */}
            <SidebarItem
              title="Home"
              icon={<BsFillGrid1X2Fill />}
              isActive={router.pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                title="Templates"
                icon={<BiSolidReport />}
                isActive={router.pathname === "/dashboard/templates"}
                href="/dashboard/templates"
              />
              <CollapseItems
                icon={<FaHome />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
            </SidebarMenu>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 p-4">
          <Tooltip content="Settings" color="foreground">
            <span>
              <FaGear className="w-6 h-6 text-[#AAAAAA]"/>
            </span>
          </Tooltip>
          {/* <Tooltip content="Profile" color="foreground">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              size={"sm"}
            />
          </Tooltip> */}
        </div>
      </div>
    </div>
  );
};
