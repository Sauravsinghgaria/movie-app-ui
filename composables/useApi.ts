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

    const uploadMovie = async (formData: FormData) => {
        const response = await fetch(`${apiBaseUrl}/movie`, {
            method: "POST",
            body: formData,
        })
        console.log("Upload Response:", response)
        if (!response.ok) {
            throw new Error("Failed to upload movie")
        }
        return response.json()
    }

    const updateMovie = async (id: number, formData: FormData) => {
        const response = await fetch(`${apiBaseUrl}/movie/${id}`, {
            method: "PUT",
            body: formData,
        })
        console.log("Update Response:", response)
        if (!response.ok) {
            throw new Error("Failed to update movie")
        }
        return response.json()
    }

    const authLogin = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, rememberMe }),
        })
        console.log("Login Response:", response)
        if (!response.ok) {
            throw new Error("Failed to login")
        }
        // Save token logic can be added here if needed
        return response.json()
    }

    return {
        getMovies,
        uploadMovie,
        updateMovie,
        authLogin,
    }
}
