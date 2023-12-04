import React from 'react';

export const SidebarMenu = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-normal tracking-wide leading-none">
                {title}
            </span>
            {children}
        </div>
    );
};
