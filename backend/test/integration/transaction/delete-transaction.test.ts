import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { TransactionService } from "../../../src/services/transaction.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("TransactionService.delete", (getContext) => {
  it("removes the persisted transaction", async () => {
    const service = new TransactionService(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
      },
    });
    const transaction = await getContext().prisma.transaction.create({
      data: {
        description: "Groceries",
        date: new Date("2026-08-02T00:00:00.000Z"),
        amount: 120,
        categoryId: category.id,
        type: TransactionType.expense,
      },
    });

    await service.delete(transaction.id);

    const persistedTransaction = await getContext().prisma.transaction.findUnique({
      where: {
        id: transaction.id,
      },
    });

    expect(persistedTransaction).toBeNull();
  });
});
