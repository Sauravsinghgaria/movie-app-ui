import Image from "next/image"
import React from "react"
import { useRouter } from "next/navigation"

interface MovieCardProps {
    title: string
    year: number
    image: string
    id: number
    poster?: { s3Url: string; fileName: string }
}

export const MovieCard: React.FC<MovieCardProps> = ({
    title,
    year,
    image,
    id,
}) => {
    const router = useRouter()

    const handleEditClick = () => {
        // Navigate to edit page with movie id
        router.push(`/movie/edit?id=${id}`)
    }

    return (
        <div
            onClick={handleEditClick}
            className="bg-[var(--card-color)] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition cursor-pointer flex flex-col"
        >
            <div className="relative w-full h-56 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                />
            </div>
            <div className="p-4 flex flex-col justify-between">
                <h3 className="text-white text-sm font-semibold">{title}</h3>
                <p className="text-gray-300 text-xs">{year}</p>
            </div>
        </div>
    )
}
