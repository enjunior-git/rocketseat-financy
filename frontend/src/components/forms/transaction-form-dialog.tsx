import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import type * as React from "react";
import { useId, useState } from "react";

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
import { Select, type SelectOption } from "@/components/ui/select";
import { useCategoriesQuery } from "@/hooks/use-categories-query";
import { useCreateTransactionMutation } from "@/hooks/use-create-transaction-mutation";
import { useUpdateTransactionMutation } from "@/hooks/use-update-transaction-mutation";
import { cn } from "@/lib/utils";
import type { CreateTransactionInput } from "@/types";

type TransactionFormValues = {
  amount?: string;
  categoryId?: string;
  date?: string;
  description?: string;
  type?: "expense" | "income";
};

type TransactionFormDialogProps = {
  defaultValues?: TransactionFormValues;
  mode: "create" | "edit";
  trigger: React.ReactElement;
  transactionId?: string;
};

function TransactionFormDialog({
  defaultValues,
  mode,
  transactionId,
  trigger,
}: TransactionFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const categoriesQuery = useCategoriesQuery();
  const createTransactionMutation = useCreateTransactionMutation();
  const updateTransactionMutation = useUpdateTransactionMutation();
  const categoryOptions = getCategoryOptions(categoriesQuery.data ?? []);
  const defaultType = defaultValues?.type ?? "expense";
  const defaultCategoryId = defaultValues?.categoryId ?? categoryOptions[0]?.value ?? null;
  const isEditing = mode === "edit";
  const isPending = createTransactionMutation.isPending || updateTransactionMutation.isPending;
  const mutationError = createTransactionMutation.error ?? updateTransactionMutation.error;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!defaultCategoryId) {
      return;
    }

    const form = event.currentTarget;
    const input = getTransactionFormInput(new FormData(form), {
      categoryId: defaultCategoryId,
      type: defaultType,
    });

    const onSuccess = () => {
      form.reset();
      setIsOpen(false);
    };

    if (isEditing && transactionId) {
      updateTransactionMutation.mutate({ id: transactionId, data: input }, { onSuccess });
      return;
    }

    createTransactionMutation.mutate(input, { onSuccess });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-w-[448px] gap-0 rounded-[8px] p-6 sm:max-w-[448px]">
        <DialogHeader className="mb-7 gap-1 pr-10">
          <DialogTitle className="text-base leading-6 font-bold text-[var(--gray-800)]">
            {isEditing ? "Edit transaction" : "New transaction"}
          </DialogTitle>
          <DialogDescription className="text-base leading-6 text-[var(--gray-600)]">
            {isEditing ? "Update this expense or income" : "Register your expense or income"}
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-2 rounded-[8px] border border-[var(--gray-200)] p-2">
            <legend className="sr-only">Type</legend>
            <TransactionTypeOption
              defaultChecked={defaultType === "expense"}
              icon={<CircleArrowDown />}
              label="Expense"
              disabled={isPending}
              value="expense"
            />
            <TransactionTypeOption
              defaultChecked={defaultType === "income"}
              icon={<CircleArrowUp />}
              label="Income"
              disabled={isPending}
              value="income"
            />
          </fieldset>

          <Input
            label="Description"
            name="description"
            placeholder="Ex. Lunch at a restaurant"
            defaultValue={defaultValues?.description}
            disabled={isPending}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Date"
              name="date"
              type="date"
              defaultValue={defaultValues?.date}
              disabled={isPending}
              required
            />
            <AmountField defaultValue={defaultValues?.amount ?? "0.00"} disabled={isPending} />
          </div>

          <Select
            label="Category"
            name="categoryId"
            defaultValue={defaultCategoryId}
            disabled={categoriesQuery.isLoading || isPending || categoryOptions.length === 0}
            options={categoryOptions}
          />

          {categoryOptions.length === 0 && !categoriesQuery.isLoading ? (
            <p className="text-sm leading-5 text-[var(--red-base)]">
              Create a category before adding a transaction.
            </p>
          ) : null}

          {mutationError ? (
            <p className="text-sm leading-5 text-[var(--red-base)]">{mutationError.message}</p>
          ) : null}

          <Button
            type="submit"
            size="label"
            className="mt-1 w-full text-base leading-6"
            disabled={categoriesQuery.isLoading || isPending || categoryOptions.length === 0}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AmountField({ defaultValue, disabled }: { defaultValue: string; disabled?: boolean }) {
  const id = useId();

  return (
    <div className="group flex w-full flex-col gap-2" data-slot="amount-root">
      <Label
        htmlFor={id}
        className="text-sm leading-5 font-medium text-[var(--gray-800)] transition-colors group-focus-within:text-[var(--brand-base)]"
      >
        Amount
      </Label>
      <div className="flex h-12 items-center gap-3 rounded-[8px] border border-[var(--gray-300)] bg-[var(--white)] px-3 text-[var(--gray-800)] transition-colors group-focus-within:text-[var(--brand-base)]">
        <span className="shrink-0 text-base leading-6 text-[var(--gray-800)]">R$</span>
        <input
          id={id}
          name="amount"
          inputMode="decimal"
          defaultValue={defaultValue}
          disabled={disabled}
          required
          className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[var(--gray-800)] outline-none placeholder:text-[var(--gray-400)] disabled:cursor-not-allowed disabled:text-[var(--gray-500)]"
        />
      </div>
    </div>
  );
}

function TransactionTypeOption({
  defaultChecked,
  disabled,
  icon,
  label,
  value,
}: {
  defaultChecked: boolean;
  disabled?: boolean;
  icon: React.ReactElement;
  label: string;
  value: TransactionFormValues["type"];
}) {
  return (
    <Label className="block">
      <input
        type="radio"
        name="type"
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex h-11 items-center justify-center gap-2 rounded-[8px] border border-transparent text-base leading-6 text-[var(--gray-600)] transition-colors peer-checked:border-current peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-base)] peer-focus-visible:outline-none [&_svg]:size-4 [&_svg]:stroke-[1.75]",
          value === "expense"
            ? "peer-checked:text-[var(--red-base)]"
            : "peer-checked:text-[var(--green-dark)]",
        )}
      >
        {icon}
        {label}
      </span>
    </Label>
  );
}

const getCategoryOptions = (categories: { id: string; title: string }[]): SelectOption[] => {
  return categories.map((category) => ({
    label: category.title,
    value: category.id,
  }));
};

const getTransactionFormInput = (
  formData: FormData,
  defaults: Pick<CreateTransactionInput, "categoryId" | "type">,
): CreateTransactionInput => {
  const rawAmount = String(formData.get("amount") ?? "0");
  const rawDate = String(formData.get("date") ?? "");

  return {
    amount: Number(rawAmount.replace(",", ".")),
    categoryId: String(formData.get("categoryId") ?? defaults.categoryId),
    date: new Date(`${rawDate}T00:00:00.000Z`).toISOString(),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? defaults.type) as "expense" | "income",
  };
};

export type { TransactionFormDialogProps, TransactionFormValues };
export { TransactionFormDialog };
