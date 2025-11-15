"use client";

import { MoviesGrid } from "@/components/ui/MoviesGrid";
import { Navbar } from "@/components/ui/Navbar";

const moviesMock = [
  {
    id: 1,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1585647342414-45696c9e8e2d?q=80&w=800",
  },
  {
    id: 2,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
  },
  {
    id: 3,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800",
  },
  {
    id: 4,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=800",
  },
  {
    id: 5,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1585647342414-45696c9e8e2d?q=80&w=800",
  },
  {
    id: 6,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
  },
  {
    id: 7,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800",
  },
  {
    id: 8,
    title: "Movie 1",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=800",
  },
];

export default function MoviesPage() {
  return (
    <div className="min-h-screen px-10 py-8">
      <Navbar title="My movies" />

      <MoviesGrid movies={moviesMock} />
    </div>
  );
}
