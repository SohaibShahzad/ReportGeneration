import React, { useState } from 'react';
import { FaChevronCircleUp } from "react-icons/fa";

export const CollapseItems = ({ icon, items, title }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between cursor-pointer p-2" onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-base font-normal">{title}</span>
                </div>
                <FaChevronCircleUp className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>
            {open && (
                <div className="pl-4">
                    {items.map((item, index) => (
                        <div key={index} className="py-1 text-gray-600 hover:text-gray-800">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
