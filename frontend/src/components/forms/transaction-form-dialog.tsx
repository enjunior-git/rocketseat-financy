import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import type * as React from "react";
import { useId } from "react";

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
import { cn } from "@/lib/utils";

type TransactionFormValues = {
  amount?: string;
  category?: string;
  date?: string;
  description?: string;
  type?: "expense" | "income";
};

type TransactionFormDialogProps = {
  defaultValues?: TransactionFormValues;
  mode: "create" | "edit";
  trigger: React.ReactElement;
};

const categoryOptions = [
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Market", value: "market" },
  { label: "Investment", value: "investment" },
  { label: "Utilities", value: "utilities" },
  { label: "Salary", value: "salary" },
  { label: "Entertainment", value: "entertainment" },
] satisfies SelectOption[];

function TransactionFormDialog({ defaultValues, mode, trigger }: TransactionFormDialogProps) {
  const defaultType = defaultValues?.type ?? "expense";
  const defaultCategory = defaultValues?.category ?? "food";
  const isEditing = mode === "edit";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire transaction form submission to the API.
  }

  return (
    <Dialog>
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
              value="expense"
            />
            <TransactionTypeOption
              defaultChecked={defaultType === "income"}
              icon={<CircleArrowUp />}
              label="Income"
              value="income"
            />
          </fieldset>

          <Input
            label="Description"
            name="description"
            placeholder="Ex. Lunch at a restaurant"
            defaultValue={defaultValues?.description}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Date"
              name="date"
              type="date"
              defaultValue={defaultValues?.date}
              required
            />
            <AmountField defaultValue={defaultValues?.amount ?? "0.00"} />
          </div>

          <Select
            label="Category"
            name="category"
            defaultValue={defaultCategory}
            options={categoryOptions}
          />

          <Button type="submit" size="label" className="mt-1 w-full text-base leading-6">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AmountField({ defaultValue }: { defaultValue: string }) {
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
          required
          className="min-w-0 flex-1 bg-transparent text-base leading-6 text-[var(--gray-800)] outline-none placeholder:text-[var(--gray-400)]"
        />
      </div>
    </div>
  );
}

function TransactionTypeOption({
  defaultChecked,
  icon,
  label,
  value,
}: {
  defaultChecked: boolean;
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

export type { TransactionFormDialogProps, TransactionFormValues };
export { TransactionFormDialog };
