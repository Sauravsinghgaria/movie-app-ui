"use client"

import { MoviesGrid } from "@/components/ui/MoviesGrid"
import { Navbar } from "@/components/ui/Navbar"
import { useApi } from "@/composables/useApi"
import { useEffect, useState } from "react"
import { EmptyState } from "./components/emptyState"

export interface IMovies {
    id: number
    title: string
    publishingYear: string
    poster: string
}

export default function MoviesPage() {
    const [movies, setMovies] = useState<IMovies[]>([])
    const { getMovies } = useApi()

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies()
                setMovies(data as IMovies[])
            } catch (error) {
                console.error("Error fetching movies:", error)
            }
        }

        fetchMovies()
        console.log("Movies page mounted")
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
