import { categoryIconToneByColor, getCategoryColor, getCategoryIcon } from "@/entities/category";
import { formatDate, formatSignedCurrency } from "@/entities/transaction";
import type { Transaction } from "@/shared/api/types";
import type { TagProps } from "@/shared/ui/tag";

type TransactionRow = {
  amount: string;
  category: string;
  categoryId: string;
  categoryVariant: TagProps["variant"];
  date: string;
  description: string;
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  type: "income" | "expense";
};

const toTransactionRow = (transaction: Transaction): TransactionRow => {
  const category = transaction.category;
  const categoryVariant = getCategoryColor(category?.colour);

  return {
    amount: formatSignedCurrency(transaction.amount, transaction.type),
    category: category?.title ?? "Uncategorized",
    categoryId: transaction.categoryId,
    categoryVariant,
    date: formatDate(transaction.date),
    description: transaction.description,
    id: transaction.id,
    icon: getCategoryIcon(category?.icon),
    iconClassName: categoryIconToneByColor[categoryVariant],
    type: transaction.type,
  };
};

export type { TransactionRow };
export { toTransactionRow };
