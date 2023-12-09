import React from 'react';

export const SidebarMenu = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm mx-4 pb-2 text-[#BBBBBB] font-normal  leading-none">
                {title}
            </span>
            {children}
        </div>
    );
};
