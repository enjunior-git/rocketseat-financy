import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex size-8 items-center justify-center rounded-[8px] border transition-colors outline-none select-none disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral:
          "border-[var(--gray-300)] bg-[var(--white)] text-[var(--gray-700)] hover:bg-[var(--gray-200)] active:bg-[var(--gray-200)] disabled:border-[var(--gray-200)] disabled:bg-[var(--white)] disabled:text-[var(--gray-300)]",
        danger:
          "border-[var(--gray-300)] bg-[var(--white)] text-[#ff4d4f] hover:bg-[var(--gray-200)] active:bg-[var(--gray-200)] disabled:border-[var(--gray-200)] disabled:bg-[var(--white)] disabled:text-[#f6b5b6]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type IconButtonProps = Omit<ButtonPrimitive.Props, "children"> & {
  icon: React.ReactNode;
  tone?: "neutral" | "danger";
};

function IconButton({ className, icon, tone = "neutral", ...props }: IconButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="icon-button"
      className={cn(iconButtonVariants({ tone }), className)}
      {...props}
    >
      {icon}
    </ButtonPrimitive>
  );
}

export type { IconButtonProps };
export { IconButton };
