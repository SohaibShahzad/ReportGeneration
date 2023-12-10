import React, { useState } from "react";
import { FaChevronCircleUp } from "react-icons/fa";

export const CollapseItems = ({ icon, items, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-between cursor-pointer px-8 py-3 hover:bg-[#1a79ff]"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          {icon}
          <span className="text-white font-bold">{title}</span>
        </div>
        <FaChevronCircleUp
          className={`text-white transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <div className="cursor-pointer">
          {items.map((item, index) => (
            <div key={index} className="py-2 px-8 text-gray-400 hover:bg-[#1a79ff] hover:text-white">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
