import { Button } from "@/components/shared/Button"

export const EmptyState = () => {
    return (
        <div className="text-center justify-center flex flex-col items-center mt-20">
            <h2 className="mb-4">Your movie list is empty</h2>
            <p className="text-sm">
                Try adding some movies to your collection!
            </p>
            <Button className="mt-2" size="lg">
                Add Movie
            </Button>
        </div>
    )
}
