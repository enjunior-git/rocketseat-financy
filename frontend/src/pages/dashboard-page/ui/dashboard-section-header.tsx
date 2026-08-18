import { Link, type LinkProps } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type DashboardSectionHeaderProps = {
  actionLabel: string;
  actionTo: LinkProps["to"];
  title: string;
};

function DashboardSectionHeader({ actionLabel, actionTo, title }: DashboardSectionHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--gray-200)] px-6">
      <h2 className="text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase">
        {title}
      </h2>

      <Link
        to={actionTo}
        className="flex items-center gap-1.5 text-sm leading-5 font-medium text-[var(--brand-base)] transition-colors hover:text-[var(--brand-dark)]"
      >
        {actionLabel}
        <ChevronRight aria-hidden="true" className="size-4 stroke-[1.75]" />
      </Link>
    </header>
  );
}

export { DashboardSectionHeader };
