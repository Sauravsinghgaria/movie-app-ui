import React from "react";

interface PaginationProps {
  current: number;
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 text-white mt-4">
      <button className="hover:text-[var(--primary-color)]">Prev</button>

      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded-md ${
            current === i + 1
              ? "bg-[var(--primary-color)] text-black"
              : "bg-transparent text-white border border-gray-400"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button className="hover:text-[var(--primary-color)]">Next</button>
    </div>
  );
};
