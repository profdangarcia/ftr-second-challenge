"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-100 group-[.toaster]:text-gray-800 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-500",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-800",
          error:
            "group-[.toaster]:bg-red-light group-[.toaster]:border-danger group-[.toaster]:text-gray-800",
          success:
            "group-[.toaster]:bg-green-light group-[.toaster]:border-success group-[.toaster]:text-gray-800",
          warning:
            "group-[.toaster]:bg-orange-light group-[.toaster]:border-orange-base group-[.toaster]:text-gray-800",
          info:
            "group-[.toaster]:bg-blue-light group-[.toaster]:border-blue-base group-[.toaster]:text-gray-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
