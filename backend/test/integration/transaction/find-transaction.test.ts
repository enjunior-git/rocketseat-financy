import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { TransactionService } from "../../../src/services/transaction.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("TransactionService.find", (getContext) => {
  it("returns the persisted transaction by id with category", async () => {
    const service = new TransactionService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
        userId: user.id,
      },
    });
    const transaction = await getContext().prisma.transaction.create({
      data: {
        description: "Groceries",
        date: new Date("2026-08-02T00:00:00.000Z"),
        amount: 120,
        categoryId: category.id,
        userId: user.id,
        type: TransactionType.expense,
      },
    });

    const foundTransaction = await service.find(transaction.id, user.id);

    expect(foundTransaction).toMatchObject({
      id: transaction.id,
      description: "Groceries",
      amount: 120,
      categoryId: category.id,
      userId: user.id,
      type: TransactionType.expense,
      category: {
        id: category.id,
        title: "Food",
      },
    });
  });
});
