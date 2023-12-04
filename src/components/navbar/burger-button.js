import React from 'react';
import { useSidebarContext } from '../layout/layout-context';

export const BurgerButton = () => {
    const { collapsed, setCollapsed } = useSidebarContext();

    const lineCommonClasses = "w-5 h-0.5 bg-current rounded transition-all duration-300 ease-linear";
    const line1Transform = collapsed ? "translate-y-0.5 rotate-45" : "-translate-y-1";
    const line2Transform = collapsed ? "translate-y-1 -rotate-45" : "translate-y-1";

    return (
        <button 
            onClick={setCollapsed} 
            className="absolute flex flex-col justify-around w-5 h-5 bg-transparent border-none cursor-pointer p-0 z-50 focus:outline-none"
        >
            <div className={`${lineCommonClasses} ${line1Transform}`} />
            <div className={`${lineCommonClasses} ${line2Transform}`} />
        </button>
    );
};
