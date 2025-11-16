"use client"

import { Button } from "@/components/shared/Button"
import { Input } from "@/components/shared/Input"
import { ImageDropZone } from "@/components/ui/ImageDropZone"
import { ProtectedRoute } from "@/components/ui/ProtectedRoute"
import { useApi } from "@/composables/useApi"
import { useStorage } from "@/composables/useStorage"
import { useRouter } from "next/navigation"
import { useState } from "react"

const NewMoviePageContent = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [titleError, setTitleError] = useState<string>("")
    const [publishingYear, setPublishingYear] = useState<string>("")
    const [publishingYearError, setPublishingYearError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const { addMovie, getMovies } = useApi()
    const { saveMovies } = useStorage()

    const handleSubmit = async () => {
        if (!title || !publishingYear || !selectedFile) {
            if (!title) setTitleError("Title is required")
            if (!publishingYear)
                setPublishingYearError("Publishing Year is required")
            if (!selectedFile) setImageError("Image is required")
            return
        }
        if (titleError || publishingYearError || imageError) {
            return
        }

        setIsLoading(true)
        try {
            await addMovie(title, publishingYear, selectedFile)

            // Fetch all movies and save to localStorage
            const allMovies = await getMovies()
            saveMovies(allMovies)

            // Redirect to movies page after successful submission
            router.push("/movie")
        } catch (error) {
            console.error("Error adding movie:", error)
            setImageError("Failed to add movie. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="text-white min-h-screen px-10 py-8">
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-12 max-w-4xl mx-auto">
                Create a new movie
            </h2>
            <div className="max-w-7xl mx-auto">
                {/* Mobile Layout */}
                <div className="md:hidden space-y-8">
                    <div className="space-y-6">
                        <Input
                            type="text"
                            placeholder="Title"
                            className="w-full p-3 rounded bg-[var(--input-bg)] text-white"
                            value={title}
                            error={titleError}
                            onChange={(event) => {
                                setTitleError("")
                                setTitle(event.target.value)
                            }}
                            onBlur={() => {
                                if (!title) setTitleError("Title is required")
                            }}
                        />
                        <Input
                            type="text"
                            placeholder="Publishing year"
                            className="w-full p-3 rounded bg-[var(--input-bg)] text-white"
                            value={publishingYear}
                            error={publishingYearError}
                            onChange={(event) => {
                                const value = event.target.value
                                // Allow only numbers
                                if (value === "" || /^\d+$/.test(value)) {
                                    setPublishingYearError("")
                                    setPublishingYear(value)
                                }
                            }}
                            onBlur={() => {
                                if (!publishingYear)
                                    setPublishingYearError(
                                        "Publishing Year is required"
                                    )
                            }}
                        />
                    </div>
                    <div>
                        <ImageDropZone
                            setSelectedFile={setSelectedFile}
                            selectedFile={selectedFile}
                            error={imageError}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            className="w-full sm:w-auto px-8"
                            size="lg"
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/movie")}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full sm:w-auto px-8"
                            size="lg"
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex w-full gap-16 justify-center">
                    <div className="w-auto flex-shrink-0">
                        <ImageDropZone
                            setSelectedFile={setSelectedFile}
                            selectedFile={selectedFile}
                            error={imageError}
                        />
                    </div>
                    <div className="w-full max-w-md">
                        <div className="space-y-6">
                            <div className="space-y-6">
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    className="w-full p-3 rounded bg-[var(--input-bg)] text-white"
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
                                    type="text"
                                    placeholder="Publishing year"
                                    className="w-56 p-3 rounded bg-[var(--input-bg)] text-white"
                                    value={publishingYear}
                                    error={publishingYearError}
                                    onChange={(event) => {
                                        const value = event.target.value
                                        // Allow only numbers
                                        if (
                                            value === "" ||
                                            /^\d+$/.test(value)
                                        ) {
                                            setPublishingYearError("")
                                            setPublishingYear(value)
                                        }
                                    }}
                                    onBlur={() => {
                                        if (!publishingYear)
                                            setPublishingYearError(
                                                "Publishing Year is required"
                                            )
                                    }}
                                />
                            </div>
                            <div className="flex gap-4 pt-6">
                                <Button
                                    className="px-8"
                                    size="lg"
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/movie")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="px-8"
                                    size="lg"
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function NewMoviePage() {
    return (
        <ProtectedRoute>
            <NewMoviePageContent />
        </ProtectedRoute>
    )
}
