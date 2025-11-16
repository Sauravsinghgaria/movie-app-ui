"use client"

import { MoviesGrid } from "@/components/ui/MoviesGrid"
import { Navbar } from "@/components/ui/Navbar"
import { ProtectedRoute } from "@/components/ui/ProtectedRoute"
import { useApi } from "@/composables/useApi"
import { useStorage } from "@/composables/useStorage"
import { useEffect, useState } from "react"
import { EmptyState } from "../../components/ui/emptyState"

export interface PosterData {
    s3Url: string
    fileName: string
}
export interface IMovies {
    id: number
    title: string
    publishingYear: string
    poster: PosterData
}

const MoviesPageContent = () => {
    const [movies, setMovies] = useState<IMovies[]>([])
    const { getMovies } = useApi()
    const { saveMovies, getMovies: getMoviesFromStorage } = useStorage()

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies()
                setMovies(data as IMovies[])
                // Save movies to localStorage
                saveMovies(data as IMovies[])
            } catch (error) {
                console.error("Error fetching movies:", error)
                // Fallback to localStorage if API fails
                const cachedMovies = getMoviesFromStorage()
                if (cachedMovies) {
                    setMovies(cachedMovies)
                }
            }
        }

        fetchMovies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="min-h-screen px-10 py-8">
            {movies.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <Navbar title="My movies" />
                    <MoviesGrid movies={movies} />
                </>
            )}
        </div>
    )
}

export default function MoviesPage() {
    return (
        <ProtectedRoute>
            <MoviesPageContent />
        </ProtectedRoute>
    )
}
