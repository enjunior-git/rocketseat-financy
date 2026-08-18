import { toInputDate } from "@/entities/transaction";
import type { CreateTransactionInput } from "@/shared/api/types";
import type { SelectOption } from "@/shared/ui/select";

type TransactionFormValues = {
  amount?: string;
  categoryId?: string;
  date?: string;
  description?: string;
  type?: "expense" | "income";
};

type EditableTransaction = Pick<
  Required<TransactionFormValues>,
  "amount" | "categoryId" | "date" | "description" | "type"
>;

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

const toTransactionFormValues = (transaction: EditableTransaction): TransactionFormValues => {
  return {
    amount: transaction.amount
      .replace(/^[+-]\s*R\$\s*/, "")
      .replace(/\./g, "")
      .replace(",", "."),
    categoryId: transaction.categoryId,
    date: toInputDate(transaction.date),
    description: transaction.description,
    type: transaction.type,
  };
};

export type { TransactionFormValues };
export { getCategoryOptions, getTransactionFormInput, toTransactionFormValues };
