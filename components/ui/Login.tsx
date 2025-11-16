"use client"
import { useState } from "react"
import { Input } from "../shared/Input"
import { Button } from "../shared/Button"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login attempt...")
        console.log({ email, password, rememberMe })
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

    return (
        <div className="mx-auto  max-w-md w-full p-8 space-y-8 bg-transparent">
            <h2 className="text-center">Sign in</h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
            >
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

                <Button className="w-full mt-6" size="lg" type="submit">
                    Login
                </Button>
            </form>
        </div>
    )
}
