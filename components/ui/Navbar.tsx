import { useStorage } from "@/composables/useStorage"
import { LogOut, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export const Navbar = ({ title }: { title: string }) => {
    const router = useRouter()
    const { deleteToken } = useStorage()
    const handleLogout = () => {
        deleteToken()
        router.push("/login")
    }
    return (
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-white text-3xl font-semibold flex items-center gap-2">
                {title}
            </h2>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => router.push("/movie/new")}
                    className="hover:cursor-pointer rounded-full hover:text-[var(--primary-color)] p-2 text-white text-sm transition"
                >
                    <Plus className="inline-block" />
                </button>
                <button
                    onClick={handleLogout}
                    className="text-white text-sm hover:cursor-pointer hover:text-[var(--primary-color)] transition"
                >
                    Logout
                    <LogOut className="inline-block ml-1 mb-1" size={16} />
                </button>
            </div>
        </div>
    )
}
