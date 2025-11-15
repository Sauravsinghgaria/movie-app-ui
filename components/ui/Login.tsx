'use client';
import { useState } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

export const Login = () => {
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Login attempt...');
    };

    return (
        <div className="mx-auto  max-w-md w-full p-8 space-y-8 bg-transparent">
            <h2 className="text-center">Sign in</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                <Input
                    placeholder="Email"
                    type="email"
                    size="md"
                />

                <Input
                    placeholder="Password"
                    type="password"
                    size="md"
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
    );
};
