import { Plus } from "lucide-react";
import { getCategoryStats, useCategoriesQuery } from "@/entities/category";
import { useDeleteCategoryMutation } from "@/features/category/delete-category";
import { CategoryFormDialog } from "@/features/category/save-category";
import { Button } from "@/shared/ui/button";
import { CategoryCard, CategoryCardSkeletons, CategoryStatusCard } from "./category-card";
import { CategoryStatCard, CategoryStatCardSkeleton } from "./category-stat-card";

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
        {categoriesQuery.isLoading ? <CategoryCardSkeletons /> : null}

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

export { CategoriesPage };
