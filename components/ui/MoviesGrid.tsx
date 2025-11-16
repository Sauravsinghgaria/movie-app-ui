import { MovieCard } from "./MovieCard";
import { Pagination } from "../ui/Pagination";
import { IMovies } from "@/app/movie/page";

export const MoviesGrid = ({ movies }: { movies: IMovies[] }) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            title={m.title}
            year={parseInt(m.publishingYear)}
            image={m.poster}
          />
        ))}
      </div>

      <div className="mt-10">
        <Pagination current={1} total={2} />
      </div>
    </div>
  );
};
