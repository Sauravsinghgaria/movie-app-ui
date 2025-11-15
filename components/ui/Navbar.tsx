import React from "react";
// import { FiLogOut, FiPlus } from "react-icons/fi";

export const Navbar = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-white text-3xl font-semibold flex items-center gap-2">
        {title}
        <span className="text-[26px]">📽️</span>
      </h2>

      <div className="flex items-center gap-6">
        <button className="text-white text-sm hover:text-[var(--primary-color)] transition">
          Logout
        </button>
        <button className="text-white hover:text-[var(--primary-color)] transition">
          {/* <FiPlus size={22} /> */}
        </button>
      </div>
    </div>
  );
};
