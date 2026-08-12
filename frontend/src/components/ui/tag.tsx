import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex min-h-7 items-center justify-center rounded-full px-3 py-0.5 text-sm leading-5 font-medium tracking-normal",
  {
    variants: {
      variant: {
        gray: "bg-[var(--gray-200)] text-[var(--gray-700)]",
        blue: "bg-[var(--blue-light)] text-[var(--blue-base)]",
        purple: "bg-[var(--purple-light)] text-[var(--purple-base)]",
        pink: "bg-[var(--pink-light)] text-[var(--pink-base)]",
        red: "bg-[var(--red-light)] text-[var(--red-base)]",
        orange: "bg-[var(--orange-light)] text-[var(--orange-base)]",
        yellow: "bg-[var(--yellow-light)] text-[var(--yellow-dark)]",
        green: "bg-[var(--green-light)] text-[var(--green-dark)]",
      },
    },
    defaultVariants: {
      variant: "gray",
    },
  },
);

type TagProps = React.ComponentProps<"span"> & VariantProps<typeof tagVariants>;

function Tag({ className, variant, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant, className }))} {...props} />;
}

export { Tag, tagVariants };
export type { TagProps };
