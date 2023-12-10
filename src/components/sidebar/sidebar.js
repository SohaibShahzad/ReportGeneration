import React from "react";
import { useRouter } from "next/router";
import { Avatar } from "@nextui-org/react";
import { FaGear } from "react-icons/fa6";
import { SidebarItem } from "./sidebar-item";
import { FaHome } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { CollapseItems } from "./collapse-items";
import { FaStar, FaCreditCard } from "react-icons/fa6";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={`fixed inset-0 z-20 font-worksans ${
        collapsed ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 m-2`}
    >
      {/* {collapsed && (
        <div
          className="fixed inset-0 bg-opacity-30 z-10"
          onClick={setCollapsed}
        />
      )} */}

      <div className="bg-[#06367A] z-100000 dark:bg-gray-800 h-full w-60 flex-shrink-0 dark:border-gray-700 rounded-lg flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex justify-center mt-6 py-6">
            <Avatar
              isBordered
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              className="w-28 h-28"
            />
          </div>
          <div className="flex flex-col gap-4 mt-4 py-2 ">
            {/* Sidebar Items Here */}
            <SidebarMenu title="DASHBOARD">
              <SidebarItem
                title="Overview"
                icon={<BsFillGrid1X2Fill className="text-white w-4 h-4" />}
                isActive={router.pathname === "/dashboard"}
                href="/dashboard"
              />
            </SidebarMenu>
            <SidebarMenu title="MAIN MENU">
              <SidebarItem
                title="Templates"
                icon={<FaStar className="text-white w-5 h-5" />}
                isActive={router.pathname === "/dashboard/templates"}
                href="/dashboard/templates"
              />
              <CollapseItems
                icon={<FaCreditCard className="text-white w-5 h-5" />}
                items={["History", "Card-Details", "Subscription"]}
                title="Payment"
              />
            </SidebarMenu>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 my-4">
          <SidebarItem
            title="Settings"
            icon={<FaGear className="text-white w-4 h-4" />}
            isActive={router.pathname === "/dashboard/settings"}
            href="/dashboard/settings"
          />
        </div>
      </div>
    </div>
  );
};
