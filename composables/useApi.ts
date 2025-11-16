export const useApi = () => {
    const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

    const getMovies = async () => {
        const response = await fetch(`${apiBaseUrl}/movie`)
        console.log("API Response:", response)
        if (!response.ok) {
            throw new Error("Failed to fetch movies")
        }
        return response.json()
    }

    return {
        getMovies,
    }
}
