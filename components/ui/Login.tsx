"use client"
import { useEffect, useState } from "react"
import { Input } from "../shared/Input"
import { Button } from "../shared/Button"
import { useApi } from "@/composables/useApi"
import { useStorage } from "@/composables/useStorage"
import { useRouter } from "next/navigation"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const router = useRouter()

    const { authLogin } = useApi()
    const { saveToken, getToken } = useStorage()

    const handleSubmit = async () => {
        if (!email || !password) {
            if (!email) setEmailError("Email is required")
            if (!password) setPasswordError("Password is required")
            return
        }
        if (emailError || passwordError) {
            return
        }
        const res = await authLogin(email, password, rememberMe)
        console.log("Login successful:", res)
        saveToken(res.token)
        // Redirect to movies page after successful login
        router.push("/movie")
    }

    const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            setEmailError("Invalid email format")
            return
        }
        setEmail(value)
        setEmailError("")
    }

    const validatePassword = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length < 6) {
            setPasswordError("Password must be at least 6 characters long")
            return
        }
        setPassword(value)
        setPasswordError("")
    }

    useEffect(() => {
        const token = getToken()
        if (token) {
            router.push("/movie")
        }
    }, [getToken, router])

    return (
        <div className="mx-auto  max-w-md w-full p-8 space-y-8 bg-transparent">
            <h2 className="text-center">Sign in</h2>

            <div className="flex flex-col gap-4 w-full">
                <Input
                    placeholder="Email"
                    type="email"
                    size="md"
                    value={email}
                    error={emailError}
                    onChange={(event) => {
                        setEmailError("")
                        setEmail(event.target.value)
                    }}
                    onBlur={validateEmail}
                />

                <Input
                    placeholder="Password"
                    type="password"
                    size="md"
                    value={password}
                    error={passwordError}
                    onChange={(event) => {
                        setPasswordError("")
                        setPassword(event.target.value)
                    }}
                    onBlur={validatePassword}
                />

                <label className="mx-auto justify-center checkbox-container mt-2">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="custom-checkbox"
                    />
                    <span className="checkbox-box"></span>
                    <span>Remember me</span>
                </label>

                <Button
                    className="w-full mt-6"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}
