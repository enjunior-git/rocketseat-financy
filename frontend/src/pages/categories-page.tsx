import {
  ArrowUpDown,
  BriefcaseBusiness,
  Clapperboard,
  Fuel,
  Gift,
  HeartPulse,
  Pencil,
  Plus,
  ShoppingCart,
  TagIcon,
  Trash2,
  TrendingUp,
  Utensils,
} from "lucide-react";

import { Navbar } from "@/components/navigation/navbar";
import { IconButton } from "@/components/ui/icon-button";
import { LabelButton } from "@/components/ui/label-button";
import { Tag, type TagProps } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

type CategoryCard = {
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  items: string;
  title: string;
  variant: TagProps["variant"];
};

type CategoryStat = {
  helper: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  value: string;
};

const categoryStats: CategoryStat[] = [
  {
    value: "8",
    helper: "Total categories",
    icon: TagIcon,
    iconClassName: "text-[var(--gray-700)]",
  },
  {
    value: "27",
    helper: "Total transactions",
    icon: ArrowUpDown,
    iconClassName: "text-[var(--purple-base)]",
  },
  {
    value: "Food",
    helper: "Most used category",
    icon: Utensils,
    iconClassName: "text-[var(--blue-base)]",
  },
];

const categories: CategoryCard[] = [
  {
    title: "Food",
    description: "Restaurants, delivery and meals",
    items: "12 items",
    variant: "blue",
    icon: Utensils,
    iconClassName: "bg-[var(--blue-light)] text-[var(--blue-base)]",
  },
  {
    title: "Entertainment",
    description: "Movies, games and leisure",
    items: "2 items",
    variant: "pink",
    icon: Clapperboard,
    iconClassName: "bg-[var(--pink-light)] text-[var(--pink-base)]",
  },
  {
    title: "Investment",
    description: "Financial applications and returns",
    items: "1 item",
    variant: "green",
    icon: TrendingUp,
    iconClassName: "bg-[var(--green-light)] text-[var(--green-base)]",
  },
  {
    title: "Market",
    description: "Groceries and home supplies",
    items: "3 items",
    variant: "orange",
    icon: ShoppingCart,
    iconClassName: "bg-[var(--orange-light)] text-[var(--orange-base)]",
  },
  {
    title: "Salary",
    description: "Monthly income and bonuses",
    items: "3 items",
    variant: "green",
    icon: BriefcaseBusiness,
    iconClassName: "bg-[var(--green-light)] text-[var(--green-base)]",
  },
  {
    title: "Health",
    description: "Medicine, appointments and exams",
    items: "0 items",
    variant: "red",
    icon: HeartPulse,
    iconClassName: "bg-[var(--red-light)] text-[var(--red-base)]",
  },
  {
    title: "Transport",
    description: "Gas, public transport and rides",
    items: "8 items",
    variant: "purple",
    icon: Fuel,
    iconClassName: "bg-[var(--purple-light)] text-[var(--purple-base)]",
  },
  {
    title: "Utilities",
    description: "Energy, water, internet and phone",
    items: "7 items",
    variant: "yellow",
    icon: Gift,
    iconClassName: "bg-[var(--yellow-light)] text-[var(--yellow-base)]",
  },
];

const showTodo = () => alert("TODO");

function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[var(--gray-100)]">
      <Navbar activeItem="Categories" userInitials="CT" />

      <section className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[28px] leading-9 font-bold text-[var(--gray-800)]">Categories</h1>
            <p className="mt-1 text-base leading-6 text-[var(--gray-600)]">
              Organize your transactions by category
            </p>
          </div>

          <LabelButton type="button" size="sm" className="w-fit" onClick={showTodo}>
            <Plus />
            New category
          </LabelButton>
        </header>

        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {categoryStats.map((stat) => (
            <CategoryStatCard key={stat.helper} {...stat} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>
    </main>
  );
}

function CategoryStatCard({ helper, icon: Icon, iconClassName, value }: CategoryStat) {
  return (
    <article className="flex min-h-[108px] items-center gap-5 rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6">
      <Icon aria-hidden="true" className={cn("size-5 shrink-0 stroke-[1.75]", iconClassName)} />

      <div>
        <p className="text-[28px] leading-9 font-bold text-[var(--gray-800)]">{value}</p>
        <p className="mt-1 text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase">
          {helper}
        </p>
      </div>
    </article>
  );
}

function CategoryCard({
  description,
  icon: Icon,
  iconClassName,
  items,
  title,
  variant,
}: CategoryCard) {
  return (
    <article className="flex min-h-[228px] flex-col rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6">
      <header className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[8px] [&_svg]:size-4 [&_svg]:stroke-[1.75]",
            iconClassName,
          )}
        >
          <Icon aria-hidden="true" />
        </span>

        <div className="flex items-center gap-2">
          <IconButton
            type="button"
            tone="danger"
            aria-label={`Delete ${title}`}
            icon={<Trash2 />}
            onClick={showTodo}
          />
          <IconButton
            type="button"
            aria-label={`Edit ${title}`}
            icon={<Pencil />}
            onClick={showTodo}
          />
        </div>
      </header>

      <div className="mt-7">
        <h2 className="text-base leading-6 font-bold text-[var(--gray-800)]">{title}</h2>
        <p className="mt-1 min-h-10 text-sm leading-5 text-[var(--gray-600)]">{description}</p>
      </div>

      <footer className="mt-auto flex items-center justify-between gap-4 pt-7">
        <Tag variant={variant}>{title}</Tag>
        <span className="text-sm leading-5 text-[var(--gray-600)]">{items}</span>
      </footer>
    </article>
  );
}

export { CategoriesPage };
