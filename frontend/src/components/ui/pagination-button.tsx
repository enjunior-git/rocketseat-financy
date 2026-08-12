import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const paginationButtonVariants = cva(
  "inline-flex size-8 items-center justify-center rounded-[10px] border text-sm leading-5 font-medium transition-colors outline-none select-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        outline:
          "border-[var(--gray-300)] bg-[var(--white)] text-[var(--gray-700)] hover:bg-[var(--gray-200)] active:bg-[var(--gray-200)] disabled:border-[var(--gray-200)] disabled:bg-[var(--white)] disabled:text-[var(--gray-300)]",
        primary:
          "border-[var(--brand-base)] bg-[var(--brand-base)] text-[var(--white)] hover:border-[var(--brand-dark)] hover:bg-[var(--brand-dark)] active:border-[var(--brand-dark)] active:bg-[var(--brand-dark)] disabled:border-[#92b9a2] disabled:bg-[#92b9a2] disabled:text-[var(--white)]",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

type PaginationButtonProps = Omit<ButtonPrimitive.Props, "children"> & {
  page: number | string;
  current?: boolean;
} & VariantProps<typeof paginationButtonVariants>;

function PaginationButton({
  className,
  page,
  current = false,
  variant,
  ...props
}: PaginationButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="pagination-button"
      aria-current={current ? "page" : undefined}
      className={cn(
        paginationButtonVariants({
          variant: variant ?? (current ? "primary" : "outline"),
        }),
        className,
      )}
      {...props}
    >
      {page}
    </ButtonPrimitive>
  );
}

export { PaginationButton };
export type { PaginationButtonProps };
