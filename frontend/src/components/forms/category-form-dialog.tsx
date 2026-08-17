import {
  Beef,
  BriefcaseBusiness,
  BusFront,
  Clapperboard,
  Dumbbell,
  Gift,
  HeartPulse,
  Home,
  Landmark,
  Library,
  ReceiptText,
  ShoppingCart,
  Utensils,
  WalletCards,
} from "lucide-react";
import type * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategoryMutation } from "@/hooks/use-create-category-mutation";
import { cn } from "@/lib/utils";

type CategoryFormValues = {
  color?: string;
  description?: string;
  icon?: string;
  title?: string;
};

type CategoryFormDialogProps = {
  defaultValues?: CategoryFormValues;
  mode: "create" | "edit";
  trigger: React.ReactElement;
};

const categoryIcons = [
  { label: "Work", value: "work", icon: BriefcaseBusiness },
  { label: "Transport", value: "transport", icon: BusFront },
  { label: "Health", value: "health", icon: HeartPulse },
  { label: "Savings", value: "savings", icon: Landmark },
  { label: "Shopping", value: "shopping", icon: ShoppingCart },
  { label: "Entertainment", value: "entertainment", icon: Clapperboard },
  { label: "Gifts", value: "gifts", icon: Gift },
  { label: "Food", value: "food", icon: Utensils },
  { label: "Pets", value: "pets", icon: Beef },
  { label: "Home", value: "home", icon: Home },
  { label: "Income", value: "income", icon: WalletCards },
  { label: "Fitness", value: "fitness", icon: Dumbbell },
  { label: "Education", value: "education", icon: Library },
  { label: "Utilities", value: "utilities", icon: ReceiptText },
] as const;

const categoryColors = [
  { label: "Green", value: "green", className: "bg-[var(--green-base)]" },
  { label: "Blue", value: "blue", className: "bg-[var(--blue-base)]" },
  { label: "Purple", value: "purple", className: "bg-[var(--purple-base)]" },
  { label: "Pink", value: "pink", className: "bg-[var(--pink-base)]" },
  { label: "Red", value: "red", className: "bg-[var(--red-base)]" },
  { label: "Orange", value: "orange", className: "bg-[var(--orange-base)]" },
  { label: "Yellow", value: "yellow", className: "bg-[var(--yellow-base)]" },
] as const;

function CategoryFormDialog({ defaultValues, mode, trigger }: CategoryFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const createCategoryMutation = useCreateCategoryMutation();
  const defaultIcon = defaultValues?.icon ?? "work";
  const defaultColor = defaultValues?.color ?? "green";
  const isEditing = mode === "edit";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isEditing) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    createCategoryMutation.mutate(
      {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        icon: String(formData.get("icon") ?? defaultIcon),
        colour: String(formData.get("color") ?? defaultColor),
      },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-w-[448px] gap-0 rounded-[8px] p-6 sm:max-w-[448px]">
        <DialogHeader className="mb-7 gap-1 pr-10">
          <DialogTitle className="text-base leading-6 font-bold text-[var(--gray-800)]">
            {isEditing ? "Edit category" : "New category"}
          </DialogTitle>
          <DialogDescription className="text-base leading-6 text-[var(--gray-600)]">
            {isEditing
              ? "Update the details for this category"
              : "Organize your transactions with categories"}
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <Input
            label="Title"
            name="title"
            placeholder="Ex. Food"
            defaultValue={defaultValues?.title}
            disabled={createCategoryMutation.isPending}
            required
          />

          <Input
            label="Description"
            name="description"
            placeholder="Category description"
            helperText="Optional"
            defaultValue={defaultValues?.description}
            disabled={createCategoryMutation.isPending}
          />

          <fieldset className="grid gap-2">
            <legend className="text-sm leading-5 font-medium text-[var(--gray-800)]">Icon</legend>
            <div className="grid grid-cols-7 gap-2">
              {categoryIcons.map(({ icon: Icon, label, value }) => (
                <Label key={value} className="block">
                  <input
                    type="radio"
                    name="icon"
                    value={value}
                    defaultChecked={value === defaultIcon}
                    disabled={createCategoryMutation.isPending}
                    required
                    className="peer sr-only"
                  />
                  <span className="flex size-10 items-center justify-center rounded-[8px] border border-[var(--gray-300)] bg-[var(--white)] text-[var(--gray-600)] transition-colors peer-checked:border-[var(--brand-base)] peer-checked:text-[var(--brand-base)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-base)] peer-focus-visible:outline-none [&_svg]:size-4 [&_svg]:stroke-[1.75]">
                    <Icon aria-hidden="true" />
                    <span className="sr-only">{label}</span>
                  </span>
                </Label>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2">
            <legend className="text-sm leading-5 font-medium text-[var(--gray-800)]">Color</legend>
            <div className="grid grid-cols-7 gap-2">
              {categoryColors.map(({ className, label, value }) => (
                <Label key={value} className="block">
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    defaultChecked={value === defaultColor}
                    disabled={createCategoryMutation.isPending}
                    required
                    className="peer sr-only"
                  />
                  <span className="flex h-8 items-center rounded-[8px] border border-[var(--gray-300)] bg-[var(--white)] p-1 transition-colors peer-checked:border-[var(--brand-base)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-base)] peer-focus-visible:outline-none">
                    <span className={cn("h-full w-full rounded-[5px]", className)} />
                    <span className="sr-only">{label}</span>
                  </span>
                </Label>
              ))}
            </div>
          </fieldset>

          {createCategoryMutation.isError ? (
            <p className="text-sm leading-5 text-[var(--red-base)]">
              {createCategoryMutation.error.message}
            </p>
          ) : null}

          <Button
            type="submit"
            size="label"
            className="mt-1 w-full text-base leading-6"
            disabled={createCategoryMutation.isPending}
          >
            {createCategoryMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type { CategoryFormDialogProps, CategoryFormValues };
export { CategoryFormDialog };
