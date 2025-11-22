import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-start justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `w-3xs h-14
          rounded-[55px]
          font-semibold text-xl
          bg-light-orange text-background
          px-2 py-4
          hover:bg-dark-red hover:shadow-lg hover:scale-[1.02]`,
        outline:
          `w-2xs h-16
          rounded-[55px]
          font-semibold text-2xl
          outline outline-light-orange outline-3 bg-background text-light-orange
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02] hover:outline-dark-red hover:text-dark-red`,
      },
      size: {
        default: "",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
