import {
  ArrowUpDown,
  BriefcaseBusiness,
  Clapperboard,
  Fuel,
  Gift,
  HeartPulse,
  Library,
  Pencil,
  Plus,
  ShoppingCart,
  TagIcon,
  Trash2,
  TrendingUp,
  Utensils,
  WalletCards,
} from "lucide-react";

import { CategoryFormDialog } from "@/components/forms/category-form-dialog";
import { ActionAlertDialog } from "@/components/ui/action-alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, type TagProps } from "@/components/ui/tag";
import { useCategoriesQuery } from "@/hooks/use-categories-query";
import { useDeleteCategoryMutation } from "@/hooks/use-delete-category-mutation";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

type CategoryStat = {
  helper: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  value: string;
};

const categoryIconByValue: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  education: Library,
  entertainment: Clapperboard,
  fitness: HeartPulse,
  food: Utensils,
  gifts: Gift,
  health: HeartPulse,
  home: Gift,
  income: WalletCards,
  pets: ShoppingCart,
  savings: TrendingUp,
  shopping: ShoppingCart,
  transport: Fuel,
  utilities: Gift,
  work: BriefcaseBusiness,
};

const categoryIconToneByColor = {
  blue: "bg-[var(--blue-light)] text-[var(--blue-base)]",
  gray: "bg-[var(--gray-200)] text-[var(--gray-700)]",
  green: "bg-[var(--green-light)] text-[var(--green-base)]",
  orange: "bg-[var(--orange-light)] text-[var(--orange-base)]",
  pink: "bg-[var(--pink-light)] text-[var(--pink-base)]",
  purple: "bg-[var(--purple-light)] text-[var(--purple-base)]",
  red: "bg-[var(--red-light)] text-[var(--red-base)]",
  yellow: "bg-[var(--yellow-light)] text-[var(--yellow-base)]",
} satisfies Record<NonNullable<TagProps["variant"]>, string>;

const getCategoryColor = (colour: string): NonNullable<TagProps["variant"]> => {
  if (colour in categoryIconToneByColor) {
    return colour as NonNullable<TagProps["variant"]>;
  }

  return "gray";
};

const getCategoryIcon = (icon: string) => {
  return categoryIconByValue[icon] ?? BriefcaseBusiness;
};

const formatTransactionCount = (count: number) => {
  return count === 1 ? "1 item" : `${count} items`;
};

const getCategoryStats = (categories: Category[]): CategoryStat[] => {
  const mostUsedCategory = categories.reduce<Category | null>((current, category) => {
    if (!current || category.transactionsAmount > current.transactionsAmount) {
      return category;
    }

    return current;
  }, null);

  return [
    {
      value: String(categories.length),
      helper: "Total categories",
      icon: TagIcon,
      iconClassName: "text-[var(--gray-700)]",
    },
    {
      value: String(categories.reduce((total, category) => total + category.transactionsAmount, 0)),
      helper: "Total transactions",
      icon: ArrowUpDown,
      iconClassName: "text-[var(--purple-base)]",
    },
    {
      value: mostUsedCategory?.title ?? "-",
      helper: "Most used category",
      icon: Utensils,
      iconClassName: "text-[var(--blue-base)]",
    },
  ];
};

function CategoriesPage() {
  const categoriesQuery = useCategoriesQuery();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const categories = categoriesQuery.data ?? [];
  const categoryStats = getCategoryStats(categories);

  return (
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
          {categoriesQuery.isLoading
            ? ["Total categories", "Total transactions", "Most used category"].map((label) => (
                <CategoryStatCardSkeleton key={label} />
              ))
            : categoryStats.map((stat) => <CategoryStatCard key={stat.helper} {...stat} />)}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categoriesQuery.isLoading ? (
            <CategoryCardSkeletons />
          ) : null}

          {categoriesQuery.isError ? (
            <CategoryStatusCard message={categoriesQuery.error.message} />
          ) : null}

          {!categoriesQuery.isLoading && !categoriesQuery.isError && categories.length === 0 ? (
            <CategoryStatusCard message="No categories yet." />
          ) : null}

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={() => deleteCategoryMutation.mutate(category.id)}
            />
          ))}
        </div>
    </section>
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

function CategoryStatCardSkeleton() {
  return (
    <Card className="min-h-[108px] flex-row items-center gap-5 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-0 ring-0">
      <Skeleton className="size-5 shrink-0" />

      <div className="w-full">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="mt-2 h-4 w-36" />
      </div>
    </Card>
  );
}

function CategoryCard({ category, onDelete }: { category: Category; onDelete: () => void }) {
  const variant = getCategoryColor(category.colour);
  const Icon = getCategoryIcon(category.icon);

  return (
    <Card className="min-h-[228px] gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0">
      <header className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[8px] [&_svg]:size-4 [&_svg]:stroke-[1.75]",
            categoryIconToneByColor[variant],
          )}
        >
          <Icon aria-hidden="true" />
        </span>

        <div className="flex items-center gap-2">
          <ActionAlertDialog
            title="Delete category?"
            description={`This will delete "${category.title}". Transactions using this category may need to be reassigned.`}
            actionLabel="Delete"
            actionVariant="destructive"
            onAction={onDelete}
            media={<Trash2 aria-hidden="true" className="text-[var(--red-base)]" />}
            trigger={
              <IconButton
                type="button"
                tone="danger"
                aria-label={`Delete ${category.title}`}
                icon={<Trash2 />}
              />
            }
          />
          <CategoryFormDialog
            categoryId={category.id}
            mode="edit"
            defaultValues={{
              color: getCategoryColor(variant),
              description: category.description,
              icon: category.icon,
              title: category.title,
            }}
            trigger={
              <IconButton type="button" aria-label={`Edit ${category.title}`} icon={<Pencil />} />
            }
          />
        </div>
      </header>

      <div className="mt-7">
        <h2 className="text-base leading-6 font-bold text-[var(--gray-800)]">{category.title}</h2>
        <p className="mt-1 min-h-10 text-sm leading-5 text-[var(--gray-600)]">
          {category.description}
        </p>
      </div>

      <footer className="mt-auto flex items-center justify-between gap-4 pt-7">
        <Tag variant={variant}>{category.title}</Tag>
        <span className="text-sm leading-5 text-[var(--gray-600)]">
          {formatTransactionCount(category.transactionsAmount)}
        </span>
      </footer>
    </Card>
  );
}

function CategoryStatusCard({ message }: { message: string }) {
  return (
    <Card className="min-h-[120px] gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0 sm:col-span-2 xl:col-span-4">
      <p className="text-sm leading-5 text-[var(--gray-600)]">{message}</p>
    </Card>
  );
}

function CategoryCardSkeletons() {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <Card
          key={item}
          className="min-h-[228px] gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0"
        >
          <header className="flex items-start justify-between gap-3">
            <Skeleton className="size-10 shrink-0" />

            <div className="flex items-center gap-2">
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
            </div>
          </header>

          <div className="mt-7">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
          </div>

          <footer className="mt-auto flex items-center justify-between gap-4 pt-7">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-5 w-14" />
          </footer>
        </Card>
      ))}
    </>
  );
}

export { CategoriesPage };
