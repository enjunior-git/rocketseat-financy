import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[8px] border font-medium whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--brand-base)] bg-[var(--brand-base)] text-[var(--white)] hover:border-[var(--brand-dark)] hover:bg-[var(--brand-dark)] active:border-[var(--brand-dark)] active:bg-[var(--brand-dark)] disabled:border-[#92b9a2] disabled:bg-[#92b9a2] disabled:text-[var(--white)]",
        outline:
          "border-[var(--gray-300)] bg-[var(--white)] text-[var(--gray-700)] hover:bg-[var(--gray-200)] active:bg-[var(--gray-200)] disabled:border-[var(--gray-200)] disabled:bg-[var(--white)] disabled:text-[var(--gray-300)]",
      },
      size: {
        md: "h-12 px-4 text-sm leading-5",
        sm: "h-9 px-4 text-sm leading-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type LabelButtonProps = ButtonPrimitive.Props & {
  variant?: "primary" | "outline";
  size?: "md" | "sm";
};

function LabelButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LabelButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="label-button"
      className={cn(labelButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { LabelButton };
export type { LabelButtonProps };
