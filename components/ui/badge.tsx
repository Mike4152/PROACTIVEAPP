import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]",
        secondary: "bg-[#1E2430] text-white hover:bg-[#2A3441]",
        destructive: "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]",
        outline: "border border-[#1E2430] text-white hover:border-[#3B82F6] hover:text-[#3B82F6]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
