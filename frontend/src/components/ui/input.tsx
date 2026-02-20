import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.ComponentProps<"input"> & {
  label?: React.ReactNode
  icon?: React.ReactNode
  helper?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      icon,
      helper,
      error = false,
      id: idProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const id = React.useId()
    const inputId = idProp ?? id

    return (
      <div className="w-full group" data-error={error}>
        {label != null && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-2 block text-sm font-medium leading-none text-gray-700",
              "group-focus-within:text-primary group-data-[error=true]:text-danger",
              disabled && "opacity-70"
            )}
          >
            {label}
          </label>
        )}
        <div
          data-error={error}
          className="flex items-center gap-3 rounded-md border border-gray-300 bg-white px-3 outline-none transition-colors disabled:bg-gray-100"
        >
          {icon != null && (
            <span
              className={cn(
                "flex shrink-0 text-gray-700 [&>svg]:size-4",
                "group-focus-within:text-primary group-data-[error=true]:text-danger"
              )}
              aria-hidden
            >
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "flex h-auto w-full min-w-0 flex-1 border-0 bg-transparent py-4 text-base text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-70",
              className
            )}
            {...props}
          />
        </div>
        {helper != null && (
          <p className="mt-2 text-xs text-gray-500">
            {helper}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
