import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          bg-light-orange text-background
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        outline:
          `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          outline outline-light-orange outline-3 bg-white text-light-orange
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02] hover:outline-dark-red hover:text-dark-red`,
        green: `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          bg-green text-white
          px-2 py-4
          hover:bg-green hover:shadow-lg hover:scale-[1.02]`,
        greenOutline:
          `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          outline outline-green outline-3 bg-white text-green
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        orange: `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          bg-orange text-white
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        orangeOutline:
          `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          outline outline-orange outline-3 bg-white text-orange
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        purple: `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          bg-purple text-white
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        purpleOutline:
          `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          outline outline-purple outline-3 bg-white text-purple
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        yellow: `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          bg-yellow text-white
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        yellowOutline:
          `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          outline outline-yellow outline-3 bg-white text-yellow
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        darkRed: `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          bg-dark-red text-white
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
        darkRedOutline:
          `w-36 h-12
          rounded-[55px]
          font-semibold text-2xl
          outline outline-dark-red outline-3 bg-white text-dark-red
          px-2 py-4
          hover:shadow-lg hover:scale-[1.02]`,
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
