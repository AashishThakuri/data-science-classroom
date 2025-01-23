import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        danger: "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
        warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        light: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
        dark: "border-transparent bg-gray-800 text-gray-100 hover:bg-gray-700",
        video: "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
        tutorial: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        document: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        course: "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200",
        book: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        article: "border-transparent bg-pink-100 text-pink-800 hover:bg-pink-200",
        tool: "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
