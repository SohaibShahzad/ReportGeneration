import { createContext, useContext } from 'react';

const SidebarContext = createContext({
    collapsed: false,
    setCollapsed: () => {},
});

const useSidebarContext = () => {
    return useContext(SidebarContext);
};

export { SidebarContext, useSidebarContext };
