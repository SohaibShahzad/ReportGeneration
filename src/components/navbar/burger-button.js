import React from "react";
import { useSidebarContext } from "../layout/layout-context";

export const BurgerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <button
      onClick={setCollapsed}
      className="absolute flex flex-col justify-around w-5 h-5 bg-transparent border-none cursor-pointer p-0 z-50 focus:outline-none"
    >
      <span
        className={`absolute h-[2px] z-10 rounded-lg transition-all duration-300 ${
          collapsed
            ? "transform rotate-45 w-[30px] top-7 bg-[#EBF2FC]"
            : "bg-[#4e8ce4] w-[25px] top-5"
        }`}
      ></span>
      <span
        className={`absolute h-[2px] z-10  rounded-lg transition-all duration-300 ${
          collapsed
            ? "transform -rotate-45 w-[30px] top-7 bg-[#EBF2FC]"
            : "w-[25px] top-7 bg-[#4e8ce4]"
        }`}
      ></span>{" "}
    </button>
  );
};
