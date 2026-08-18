import { Pencil, Trash2 } from "lucide-react";

import {
  categoryIconToneByColor,
  formatTransactionCount,
  getCategoryColor,
  getCategoryIcon,
} from "@/entities/category";
import { CategoryFormDialog } from "@/features/category/save-category";
import type { Category } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { ActionAlertDialog } from "@/shared/ui/action-alert-dialog";
import { Card } from "@/shared/ui/card";
import { IconButton } from "@/shared/ui/icon-button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Tag } from "@/shared/ui/tag";

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

export { CategoryCard, CategoryCardSkeletons, CategoryStatusCard };
