"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStorage } from "@/composables/useStorage"

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const router = useRouter()
    const { getToken } = useStorage()

    useEffect(() => {
        const token = getToken()
        if (!token) {
            // No token found, redirect to login
            router.push("/")
        } else {
            // Token exists, user is authenticated
            setIsAuthenticated(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Show nothing while checking authentication
    if (isAuthenticated === null) {
        return null
    }

    // If authenticated, show the protected content
    if (isAuthenticated) {
        return <>{children}</>
    }

    // If not authenticated, show nothing (redirect will happen)
    return null
}
