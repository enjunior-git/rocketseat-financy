import { Link, type LinkProps } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type NavbarItem = {
  to: LinkProps["to"];
  label: string;
};

type NavbarProps = {
  activeItem?: string;
  items?: NavbarItem[];
  userInitials?: string;
};

const defaultItems: NavbarItem[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
  },
  {
    to: "/transactions",
    label: "Transactions",
  },
  {
    to: "/categories",
    label: "Categories",
  },
];

function Navbar({ activeItem, items = defaultItems, userInitials = "CT" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--gray-200)] bg-[var(--white)]">
      <div className="mx-auto grid h-[72px] w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10">
        <Link to="/dashboard" className="flex w-fit items-center">
          <img src={Logo} alt="Financy" className="h-6 w-auto" />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 sm:flex">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm leading-5 font-medium text-[var(--gray-600)] transition-colors hover:text-[var(--brand-base)]",
                activeItem === item.label && "text-[var(--brand-base)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/profile"
            aria-label="Edit profile"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-base)]"
          >
            <Avatar className="bg-[var(--gray-300)] text-[var(--gray-800)]">
              <AvatarFallback className="bg-[var(--gray-300)] text-xs font-semibold text-[var(--gray-800)]">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}

export type { NavbarItem, NavbarProps };
export { Navbar };
