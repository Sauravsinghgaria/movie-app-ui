"use client"

import { Button } from "@/components/shared/Button"
import { useRouter } from "next/navigation"

export const EmptyState = () => {
    const router = useRouter()
    return (
        <div className="text-center justify-center flex flex-col items-center mt-20">
            <h2 className="mb-4">Your movie list is empty</h2>
            <p className="text-sm">
                Try adding some movies to your collection!
            </p>
            <Button
                className="mt-2 cursor-pointer"
                size="lg"
                onClick={() => router.push("/movie/new")}
            >
                Add Movie
            </Button>
        </div>
    )
}
