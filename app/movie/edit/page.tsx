"use client"

import { Button } from "@/components/shared/Button"
import { Input } from "@/components/shared/Input"
import { ImageDropZone } from "@/components/ui/ImageDropZone"
import { useState } from "react"

export default function EditMoviePage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
            <div className="flex w-full">
                <div>
                    <ImageDropZone
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                </div>
                <div>
                    <form className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Movie Title"
                                className="w-full p-2 rounded bg-[var(--input-bg)] text-white"
                            />
                            <Input
                                type="number"
                                placeholder="Publishing Year"
                                className="w-full p-2 rounded bg-[var(--input-bg)] text-white mt-4"
                            />
                        </div>
                        <div className="flex md:flex-row gap-4 mt-6">
                            <Button
                                className="w-full mt-6"
                                size="lg"
                                type="submit"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mt-6"
                                size="lg"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
