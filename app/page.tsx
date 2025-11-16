"use client"

import { Login } from "@/components/ui/Login"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useStorage } from "@/composables/useStorage"

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { getToken } = useStorage()

    useEffect(() => {
        const token = getToken()
        if (token) {
            // User already logged in, redirect to movies page
            router.push("/movie")
        } else {
            // No token, show login page
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return null
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Login />
        </div>
    )
}
