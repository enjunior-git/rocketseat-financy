import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { TransactionService } from "../../../src/services/transaction.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("TransactionService.list", (getContext) => {
  it("returns only the persisted transactions for the user with category", async () => {
    const service = new TransactionService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);
    const otherUser = await createTestUser(getContext().prisma, "other@example.com");
    const category = await getContext().prisma.category.create({
      data: {
        title: "Salary",
        description: "Work income",
        icon: "briefcase",
        colour: "#0ea5e9",
        userId: user.id,
      },
    });
    const otherCategory = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
        userId: otherUser.id,
      },
    });
    const transaction = await getContext().prisma.transaction.create({
      data: {
        description: "August paycheck",
        date: new Date("2026-08-01T00:00:00.000Z"),
        amount: 5000,
        categoryId: category.id,
        userId: user.id,
        type: TransactionType.income,
      },
    });
    await getContext().prisma.transaction.create({
      data: {
        description: "Groceries",
        date: new Date("2026-08-02T00:00:00.000Z"),
        amount: 120,
        categoryId: otherCategory.id,
        userId: otherUser.id,
        type: TransactionType.expense,
      },
    });

    const transactions = await service.list(user.id);

    expect(transactions).toMatchObject([
      {
        id: transaction.id,
        description: "August paycheck",
        amount: 5000,
        categoryId: category.id,
        userId: user.id,
        type: TransactionType.income,
        category: {
          id: category.id,
          title: "Salary",
        },
      },
    ]);
  });
});
