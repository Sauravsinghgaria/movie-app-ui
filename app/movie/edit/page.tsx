"use client"

import { Button } from "@/components/shared/Button"
import { Input } from "@/components/shared/Input"
import { ImageDropZone } from "@/components/ui/ImageDropZone"
import { ProtectedRoute } from "@/components/ui/ProtectedRoute"
import { useApi } from "@/composables/useApi"
import { useStorage } from "@/composables/useStorage"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IMovies } from "@/app/movie/page"

const EditMoviePageContent = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [titleError, setTitleError] = useState<string>("")
    const [publishingYear, setPublishingYear] = useState<string>("")
    const [publishingYearError, setPublishingYearError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [movieData, setMovieData] = useState<IMovies | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const { updateMovie } = useApi()
    const { getMovieById } = useStorage()

    useEffect(() => {
        // Get movie id from URL params
        const movieId = searchParams.get("id")
        if (movieId) {
            const movie = getMovieById(parseInt(movieId))
            if (movie) {
                setMovieData(movie)
                setTitle(movie.title)
                setPublishingYear(movie.publishingYear)
            } else {
                // Movie not found in localStorage
                setImageError("Movie not found")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !publishingYear) {
            if (!title) setTitleError("Title is required")
            if (!publishingYear)
                setPublishingYearError("Publishing Year is required")
            return
        }
        if (titleError || publishingYearError || imageError) {
            return
        }

        if (!movieData?.id) {
            setImageError("Movie data not found. Please try again.")
            return
        }

        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("publishingYear", publishingYear)
            if (selectedFile) {
                formData.append("poster", selectedFile)
            }

            await updateMovie(movieData.id, formData)

            // Redirect to movies page after successful update
            router.push("/movie")
        } catch (error) {
            console.error("Error updating movie:", error)
            setImageError("Failed to update movie. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Update Movie</h2>
            <div className="flex w-full">
                <div className="mr-4">
                    <ImageDropZone
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        error={imageError}
                    />
                </div>
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Input
                                type="text"
                                placeholder="Movie Title"
                                className="w-full p-2 rounded bg-[var(--input-bg)] text-white"
                                value={title}
                                error={titleError}
                                onChange={(event) => {
                                    setTitleError("")
                                    setTitle(event.target.value)
                                }}
                                onBlur={() => {
                                    if (!title)
                                        setTitleError("Title is required")
                                }}
                            />
                            <Input
                                type="number"
                                placeholder="Publishing Year"
                                className="w-full p-2 rounded bg-[var(--input-bg)] text-white mt-4"
                                value={publishingYear}
                                error={publishingYearError}
                                onChange={(event) => {
                                    setPublishingYearError("")
                                    setPublishingYear(event.target.value)
                                }}
                                onBlur={() => {
                                    if (!publishingYear)
                                        setPublishingYearError(
                                            "Publishing Year is required"
                                        )
                                }}
                            />
                        </div>
                        <div className="flex md:flex-row gap-4 mt-6">
                            <Button
                                className="w-full mt-6"
                                size="lg"
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    router.push("/movie")
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mt-6"
                                size="lg"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function EditMoviePage() {
    return (
        <ProtectedRoute>
            <EditMoviePageContent />
        </ProtectedRoute>
    )
}
