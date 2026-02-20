import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-base text-primary-foreground shadow hover:bg-brand-dark",
        outline:
          "border border-input bg-background shadow-sm hover:bg-gray-200 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary font-normal",
      },
      size: {
        default: "px-1.5 py-3 text-base",
        sm: "rounded-md px-3 text-sm",
        icon: "h-8 w-8",
      },
      active: {
        true: "bg-brand-base hover:bg-brand-dark text-primary-foreground hover:text-primary-foreground",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      active: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, active }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
