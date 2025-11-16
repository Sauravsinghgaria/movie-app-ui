import React from "react"

type InputSize = "sm" | "md" | "lg"

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    error?: string
    size?: InputSize
}

const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
}

export const Input: React.FC<InputProps> = ({
    size = "md",
    error,
    className,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <input
                {...props}
                className={`
          bg-[var(--input-color)] text-white rounded-lg 
          border-2 outline-none 
          transition duration-200
          ${
              error
                  ? "border-[var(--error-color)]"
                  : "focus:border-[var(--primary-color)]"
          }
          ${sizeClasses[size]}
          ${className}
        `}
            />

            {error && (
                <span className="text-[var(--error-color)] text-xs">
                    {error}
                </span>
            )}
        </div>
    )
}
