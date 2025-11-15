import React from "react";

interface MovieCardProps {
  title: string;
  year: number;
  image: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ title, year, image }) => {
  return (
    <div className="bg-[var(--card-color)] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition cursor-pointer">
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      <div className="p-3">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <p className="text-gray-300 text-xs">{year}</p>
      </div>
    </div>
  );
};
