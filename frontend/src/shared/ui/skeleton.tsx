import { cn } from "@/shared/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-[8px] bg-[var(--gray-200)]", className)}
      {...props}
    />
  );
}

export { Skeleton };
