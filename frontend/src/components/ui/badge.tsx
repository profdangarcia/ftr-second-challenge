import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-3 py-1 text-sm w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-700",
        blue: "bg-blue-light text-blue-dark",
        purple: "bg-purple-light text-purple-dark",
        pink: "bg-pink-light text-pink-dark",
        red: "bg-red-light text-red-dark",
        orange: "bg-orange-light text-orange-dark",
        yellow: "bg-yellow-light text-yellow-dark",
        green: "bg-green-light text-green-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/** Cor BASE da variante para o ícone (modo icon). */
const variantIconColorClass: Record<
  NonNullable<VariantProps<typeof badgeVariants>["variant"]>,
  string
> = {
  default: "text-gray-700",
  blue: "text-blue-base",
  purple: "text-purple-base",
  pink: "text-pink-base",
  red: "text-red-base",
  orange: "text-orange-base",
  yellow: "text-yellow-base",
  green: "text-green-base",
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  icon,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    icon?: React.ReactNode
  }) {
  const Comp = asChild ? Slot : "span"
  const isIconMode = icon != null

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        badgeVariants({ variant }),
        isIconMode && "h-10 w-10 !rounded-lg p-0",
        className
      )}
      {...props}
    >
      {isIconMode ? (
        <span
          className={cn(
            "flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0",
            variantIconColorClass[variant ?? "default"]
          )}
        >
          {icon}
        </span>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Badge, badgeVariants }
