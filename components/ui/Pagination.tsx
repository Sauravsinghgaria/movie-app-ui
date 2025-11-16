import React from "react"

interface PaginationProps {
    current: number
    total: number
    onPageChange?: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
    current,
    total,
    onPageChange,
}) => {
    const handlePrevClick = () => {
        if (current > 1 && onPageChange) {
            onPageChange(current - 1)
        }
    }

    const handleNextClick = () => {
        if (current < total && onPageChange) {
            onPageChange(current + 1)
        }
    }

    const handlePageClick = (page: number) => {
        if (onPageChange) {
            onPageChange(page)
        }
    }

    return (
        <div className="flex items-center justify-center gap-4 text-white mt-4">
            <button
                onClick={handlePrevClick}
                disabled={current === 1}
                className={`hover:text-[var(--primary-color)] ${
                    current === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Prev
            </button>

            {[...Array(total)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => handlePageClick(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                        current === i + 1
                            ? "bg-[var(--primary-color)] text-black"
                            : "bg-transparent text-white border border-gray-400 hover:border-[var(--primary-color)]"
                    }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={handleNextClick}
                disabled={current === total}
                className={`hover:text-[var(--primary-color)] ${
                    current === total ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Next
            </button>
        </div>
    )
}
