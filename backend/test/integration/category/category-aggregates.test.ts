import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("CategoryService aggregates", (getContext) => {
  it("counts transactions and sums expenses for a category", async () => {
    const service = new CategoryService(getContext().prisma);
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

    await getContext().prisma.transaction.createMany({
      data: [
        {
          description: "Groceries",
          date: new Date("2026-08-02T00:00:00.000Z"),
          amount: 120,
          categoryId: category.id,
          userId: user.id,
          type: TransactionType.expense,
        },
        {
          description: "Refund",
          date: new Date("2026-08-03T00:00:00.000Z"),
          amount: 20,
          categoryId: category.id,
          userId: user.id,
          type: TransactionType.income,
        },
      ],
    });

    await expect(service.countTransactions(category.id, user.id)).resolves.toBe(2);
    await expect(service.sumExpenses(category.id, user.id)).resolves.toBe(120);
  });
});
