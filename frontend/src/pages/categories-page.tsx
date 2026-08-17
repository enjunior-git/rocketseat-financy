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

import {
  CategoryFormDialog,
  type CategoryFormValues,
} from "@/components/forms/category-form-dialog";
import { Navbar } from "@/components/navigation/navbar";
import { ActionAlertDialog } from "@/components/ui/action-alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
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

const categoryIconByTitle = {
  Entertainment: "entertainment",
  Food: "food",
  Health: "health",
  Investment: "savings",
  Market: "shopping",
  Salary: "work",
  Transport: "transport",
  Utilities: "utilities",
} satisfies Record<string, CategoryFormValues["icon"]>;

function getCategoryIcon(title: string) {
  return categoryIconByTitle[title as keyof typeof categoryIconByTitle] ?? "work";
}

function getCategoryColor(variant: TagProps["variant"]) {
  return variant && variant !== "gray" ? variant : "green";
}

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

          <CategoryFormDialog
            mode="create"
            trigger={
              <Button type="button" size="label-sm" className="w-fit">
                <Plus />
                New category
              </Button>
            }
          />
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
    <Card className="min-h-[108px] flex-row items-center gap-5 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-0 ring-0">
      <Icon aria-hidden="true" className={cn("size-5 shrink-0 stroke-[1.75]", iconClassName)} />

      <div>
        <p className="text-[28px] leading-9 font-bold text-[var(--gray-800)]">{value}</p>
        <p className="mt-1 text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase">
          {helper}
        </p>
      </div>
    </Card>
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
    <Card className="min-h-[228px] gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0">
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
          <ActionAlertDialog
            title="Delete category?"
            description={`This will delete "${title}". Transactions using this category may need to be reassigned.`}
            actionLabel="Delete"
            actionVariant="destructive"
            media={<Trash2 aria-hidden="true" className="text-[var(--red-base)]" />}
            trigger={
              <IconButton
                type="button"
                tone="danger"
                aria-label={`Delete ${title}`}
                icon={<Trash2 />}
              />
            }
          />
          <CategoryFormDialog
            mode="edit"
            defaultValues={{
              color: getCategoryColor(variant),
              description,
              icon: getCategoryIcon(title),
              title,
            }}
            trigger={<IconButton type="button" aria-label={`Edit ${title}`} icon={<Pencil />} />}
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
    </Card>
  );
}

export { CategoriesPage };
