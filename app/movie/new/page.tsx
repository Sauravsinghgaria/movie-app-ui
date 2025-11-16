"use client"

import { Button } from "@/components/shared/Button"
import { Input } from "@/components/shared/Input"
import { ImageDropZone } from "@/components/ui/ImageDropZone"
import { useApi } from "@/composables/useApi"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewMoviePage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [titleError, setTitleError] = useState<string>("")
    const [publishingYear, setPublishingYear] = useState<string>("")
    const [publishingYearError, setPublishingYearError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const { addMovie } = useApi()

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
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Create a new Movie</h2>
            <div className="flex w-full">
                <div className="mr-4">
                    <ImageDropZone
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                        error={imageError}
                    />
                </div>
                <div>
                    <div className="space-y-4">
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
                                            "Title is required"
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
                                onClick={() => router.push("/movie")}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mt-6"
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
    )
}
