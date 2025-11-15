import { Button } from "@/components/shared/Button"
import { Input } from "@/components/shared/Input"

export const NewMoviePage = () => {
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Create a new Movie</h2>
            <div className="flex w-full">
                <div>
                    <span className="sr-only">File Picker</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[var(--input-bg)] file:text-white
                        hover:file:bg-[var(--card-color)]
                        "
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
