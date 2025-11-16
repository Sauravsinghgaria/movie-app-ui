import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Movie App",
    description: "Movie app built with Next.js and Nest.js",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="bg-[var(--background-color)] min-h-screen p-4">
                {children}
            </body>
        </html>
    )
}
