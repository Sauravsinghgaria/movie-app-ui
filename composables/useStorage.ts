import { IMovies } from "@/app/movie/page"

// LocalStorage to save Token and Fetched Movies.

export const useStorage = () => {
    const saveToken = (token: string) => {
        localStorage.setItem("authToken", token)
    }
    const getToken = (): string | null => {
        return localStorage.getItem("authToken")
    }

    const deleteToken = () => {
        localStorage.removeItem("authToken")
    }

    const saveMovies = (movies: IMovies[]) => {
        localStorage.setItem("movies", JSON.stringify(movies))
    }

    const getMovies = (): IMovies[] | null => {
        const movies = localStorage.getItem("movies")
        return movies ? JSON.parse(movies) : null
    }

    const getMovieById = (id: number): IMovies | null => {
        const movies = getMovies()
        if (!movies) return null
        return movies.find((movie) => movie.id === id) || null
    }

    return {
        saveToken,
        getToken,
        saveMovies,
        getMovies,
        getMovieById,
        deleteToken,
    }
}
