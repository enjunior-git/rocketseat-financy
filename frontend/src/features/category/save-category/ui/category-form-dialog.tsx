import type * as React from "react";
import { useState } from "react";

import { categoryColors, categoryIcons } from "@/entities/category";
import {
  getCategoryFormInput,
  type CategoryFormValues,
} from "../model/category-form";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";
import { useCreateCategoryMutation } from "../model/use-create-category-mutation";
import { useUpdateCategoryMutation } from "../model/use-update-category-mutation";

type CategoryFormDialogProps = {
  categoryId?: string;
  defaultValues?: CategoryFormValues;
  mode: "create" | "edit";
  trigger: React.ReactElement;
};

function CategoryFormDialog({ categoryId, defaultValues, mode, trigger }: CategoryFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const defaultIcon = defaultValues?.icon ?? "work";
  const defaultColor = defaultValues?.color ?? "green";
  const isEditing = mode === "edit";
  const isPending = createCategoryMutation.isPending || updateCategoryMutation.isPending;
  const mutationError = createCategoryMutation.error ?? updateCategoryMutation.error;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = getCategoryFormInput(new FormData(form), {
      color: defaultColor,
      icon: defaultIcon,
    });

    const onSuccess = () => {
      form.reset();
      setIsOpen(false);
    };

    if (isEditing && categoryId) {
      updateCategoryMutation.mutate({ id: categoryId, data: input }, { onSuccess });
      return;
    }

    createCategoryMutation.mutate(input, { onSuccess });
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
            disabled={isPending}
            required
          />

          <Input
            label="Description"
            name="description"
            placeholder="Category description"
            helperText="Optional"
            defaultValue={defaultValues?.description}
            disabled={isPending}
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
                    disabled={isPending}
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
                    disabled={isPending}
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

          {mutationError ? (
            <p className="text-sm leading-5 text-[var(--red-base)]">{mutationError.message}</p>
          ) : null}

          <Button
            type="submit"
            size="label"
            className="mt-1 w-full text-base leading-6"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type { CategoryFormDialogProps, CategoryFormValues };
export { CategoryFormDialog };
