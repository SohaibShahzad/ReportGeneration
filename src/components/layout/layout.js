import { useState } from "react";
import { SidebarWrapper } from "../sidebar/sidebar";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarContext } from "./layout-context";
import { useLockedBody } from "../hooks/useBodyLock";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_, setLocked] = useLockedBody(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{ collapsed: sidebarOpen, setCollapsed: handleToggleSidebar }}
    >
      <div className="flex h-screen bg-[#EBF2FC] font-worksans">
        <SidebarWrapper />
        <div className="flex-1 overflow-y-auto max-w-none">
          <NavbarWrapper>{children}</NavbarWrapper>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
