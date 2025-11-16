"use client"

import { CheckCircle, Download } from "lucide-react"
import { useCallback, useState, type DragEvent, type ChangeEvent } from "react"

interface ImageDropZoneProps {
    setSelectedFile: (file: File | null) => void
    selectedFile: File | null
}

export const ImageDropZone = ({
    setSelectedFile,
    selectedFile,
}: ImageDropZoneProps) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        // Only set dragging to false if leaving the main drop area
        if (e.currentTarget.contains(e.relatedTarget as Node)) return
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const processFile = useCallback(
        (files: FileList | null) => {
            if (files && files.length > 0) {
                const file = files[0]
                if (file.type.startsWith("image/")) {
                    setSelectedFile(file) // Pass the file up to the parent
                } else {
                    console.error("File must be an image.")
                    setSelectedFile(null)
                }
            }
            setIsDragging(false)
        },
        [setSelectedFile]
    )

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        processFile(e.dataTransfer.files)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        processFile(e.target.files)
    }

    return (
        <div
            className={`
        flex-shrink-0 w-full h-80 md:w-96 md:h-96 
        rounded-xl p-8 transition duration-200 relative
        flex flex-col items-center justify-center text-center
        ${
            isDragging
                ? "border-4 border-solid border-white bg-white/5"
                : "border-2 border-dashed border-white bg-white/10 hover:bg-white/5"
        }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
            />

            {selectedFile ? (
                <div className="text-emerald-500">
                    <CheckCircle size={48} className="mx-auto mb-3" />
                    <p className="text-sm font-medium">Image Selected:</p>
                    <p className="text-xs text-slate-300">
                        {selectedFile.name}
                    </p>
                </div>
            ) : (
                <div className="text-white">
                    <Download
                        size={48}
                        className="mx-auto mb-4 text-slate-400"
                    />
                    <p className="text-lg font-semibold mb-1">
                        Drop an image here
                    </p>
                    <p className="text-sm text-slate-400 mb-4">
                        or click to select file
                    </p>
                </div>
            )}
        </div>
    )
}
