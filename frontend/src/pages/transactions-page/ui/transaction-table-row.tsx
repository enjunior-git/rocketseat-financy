import { CircleArrowDown, CircleArrowUp, Pencil, Trash2 } from "lucide-react";

import {
  TransactionFormDialog,
  toTransactionFormValues,
} from "@/features/transaction/save-transaction";
import { cn } from "@/shared/lib/utils";
import { ActionAlertDialog } from "@/shared/ui/action-alert-dialog";
import { IconButton } from "@/shared/ui/icon-button";
import { Tag } from "@/shared/ui/tag";
import type { TransactionRow } from "../model/transaction-row";

function TransactionTableRow({
  amount,
  category,
  categoryId,
  categoryVariant,
  date,
  description,
  id,
  onDelete,
  icon: Icon,
  iconClassName,
  type,
}: TransactionRow & { onDelete: () => void }) {
  const TypeIcon = type === "income" ? CircleArrowUp : CircleArrowDown;

  return (
    <tr className="h-[74px] border-b border-[var(--gray-200)] last:border-b-0">
      <td className="px-6">
        <div className="flex min-w-0 items-center gap-4">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-[8px] [&_svg]:size-4 [&_svg]:stroke-[1.75]",
              iconClassName,
            )}
          >
            <Icon aria-hidden="true" />
          </span>
          <span className="truncate text-base leading-6 font-medium text-[var(--gray-800)]">
            {description}
          </span>
        </div>
      </td>
      <td className="px-6 text-center text-sm leading-5 text-[var(--gray-600)]">{date}</td>
      <td className="px-6 text-center">
        <Tag variant={categoryVariant}>{category}</Tag>
      </td>
      <td className="px-6 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm leading-5 font-medium",
            type === "income" ? "text-[var(--green-dark)]" : "text-[var(--red-base)]",
          )}
        >
          <TypeIcon aria-hidden="true" className="size-4 stroke-[1.75]" />
          {type === "income" ? "Income" : "Expense"}
        </span>
      </td>
      <td className="px-6 text-right text-sm leading-5 font-bold text-[var(--gray-800)]">
        {amount}
      </td>
      <td className="px-6">
        <div className="ml-auto flex w-20 items-center justify-end gap-2">
          <ActionAlertDialog
            title="Delete transaction?"
            description={`This will delete "${description}" from your transaction history.`}
            actionLabel="Delete"
            actionVariant="destructive"
            onAction={onDelete}
            media={<Trash2 aria-hidden="true" className="text-[var(--red-base)]" />}
            trigger={
              <IconButton
                type="button"
                tone="danger"
                aria-label={`Delete ${description}`}
                icon={<Trash2 />}
              />
            }
          />
          <TransactionFormDialog
            mode="edit"
            transactionId={id}
            defaultValues={toTransactionFormValues({
              amount,
              categoryId,
              date,
              description,
              type,
            })}
            trigger={
              <IconButton type="button" aria-label={`Edit ${description}`} icon={<Pencil />} />
            }
          />
        </div>
      </td>
    </tr>
  );
}

export { TransactionTableRow };
