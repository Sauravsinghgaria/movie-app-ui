import { MovieCard } from "./MovieCard"
import { Pagination } from "../ui/Pagination"
import { IMovies } from "@/app/movie/page"
import { useState } from "react"

const ITEMS_PER_PAGE = 8

export const MoviesGrid = ({ movies }: { movies: IMovies[] }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedMovies = movies.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedMovies.map((m) => (
                    <MovieCard
                        key={m.id}
                        id={m.id}
                        title={m.title}
                        year={parseInt(m.publishingYear)}
                        image={m.poster.s3Url}
                        poster={m.poster}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-10">
                    <Pagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}
