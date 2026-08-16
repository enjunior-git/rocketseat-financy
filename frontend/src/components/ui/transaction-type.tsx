import { CircleArrowDown, CircleArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

const transactionTypeVariants = {
  in: {
    label: "In",
    icon: CircleArrowUp,
    className: "text-[var(--green-dark)]",
  },
  out: {
    label: "Out",
    icon: CircleArrowDown,
    className: "text-[var(--red-base)]",
  },
} as const;

type TransactionTypeValue = keyof typeof transactionTypeVariants;

type TransactionTypeProps = Omit<React.ComponentProps<"span">, "children"> & {
  type: TransactionTypeValue;
  children?: string;
};

function TransactionType({ className, type, children, ...props }: TransactionTypeProps) {
  const config = transactionTypeVariants[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm leading-5 font-medium tracking-normal",
        config.className,
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0 stroke-[1.75]" />
      <span>{children ?? config.label}</span>
    </span>
  );
}

export type { TransactionTypeProps, TransactionTypeValue };
export { TransactionType };
