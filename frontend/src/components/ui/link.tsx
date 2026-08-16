import { cn } from "@/lib/utils";

type LinkProps = React.ComponentProps<"a">;

function Link({ className, ...props }: LinkProps) {
  return (
    <a
      data-slot="link"
      className={cn(
        "text-sm leading-5 font-medium text-[var(--brand-base)] underline-offset-4 outline-none hover:underline focus-visible:underline focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

export type { LinkProps };
export { Link };
