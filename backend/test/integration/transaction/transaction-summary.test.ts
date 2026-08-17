import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { TransactionService } from "../../../src/services/transaction.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("TransactionService.summary", (getContext) => {
  it("returns monthly totals, all-time balance, category metrics, and the most used category", async () => {
    const service = new TransactionService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);
    const otherUser = await createTestUser(getContext().prisma, "other@example.com");
    const [salary, food, travel] = await Promise.all([
      getContext().prisma.category.create({
        data: {
          title: "Salary",
          description: "Work income",
          icon: "briefcase",
          colour: "#0ea5e9",
          userId: user.id,
        },
      }),
      getContext().prisma.category.create({
        data: {
          title: "Food",
          description: "Groceries and restaurants",
          icon: "utensils",
          colour: "#22c55e",
          userId: user.id,
        },
      }),
      getContext().prisma.category.create({
        data: {
          title: "Travel",
          description: "Transport",
          icon: "plane",
          colour: "#f97316",
          userId: user.id,
        },
      }),
    ]);
    const otherCategory = await getContext().prisma.category.create({
      data: {
        title: "Other",
        description: "Other user's category",
        icon: "circle",
        colour: "#64748b",
        userId: otherUser.id,
      },
    });

    await getContext().prisma.transaction.createMany({
      data: [
        {
          description: "August paycheck",
          date: new Date("2026-08-01T00:00:00.000Z"),
          amount: 5000,
          categoryId: salary.id,
          userId: user.id,
          type: TransactionType.income,
        },
        {
          description: "Groceries",
          date: new Date("2026-08-02T00:00:00.000Z"),
          amount: 120,
          categoryId: food.id,
          userId: user.id,
          type: TransactionType.expense,
        },
        {
          description: "Dinner",
          date: new Date("2026-08-03T00:00:00.000Z"),
          amount: 80,
          categoryId: food.id,
          userId: user.id,
          type: TransactionType.expense,
        },
        {
          description: "July train",
          date: new Date("2026-07-20T00:00:00.000Z"),
          amount: 50,
          categoryId: travel.id,
          userId: user.id,
          type: TransactionType.expense,
        },
        {
          description: "July bonus",
          date: new Date("2026-07-15T00:00:00.000Z"),
          amount: 1000,
          categoryId: salary.id,
          userId: user.id,
          type: TransactionType.income,
        },
        {
          description: "Other income",
          date: new Date("2026-08-01T00:00:00.000Z"),
          amount: 9999,
          categoryId: otherCategory.id,
          userId: otherUser.id,
          type: TransactionType.income,
        },
      ],
    });

    const summary = await service.summary(user.id, new Date("2026-08-16T00:00:00.000Z"));

    expect(summary).toMatchObject({
      totalIncomeMonthly: 5000,
      totalExpensesMonthly: 200,
      totalBalance: 5750,
      totalCategoriesAmount: 3,
      totalTransactionsAmount: 5,
      mostUsedCategory: {
        id: salary.id,
        title: "Salary",
        colour: "#0ea5e9",
        transactionsAmount: 2,
        totalExpensesAmount: 0,
      },
    });
    expect(summary.categories).toEqual(
      expect.arrayContaining([
        {
          id: salary.id,
          title: "Salary",
          colour: "#0ea5e9",
          transactionsAmount: 2,
          totalExpensesAmount: 0,
        },
        {
          id: food.id,
          title: "Food",
          colour: "#22c55e",
          transactionsAmount: 2,
          totalExpensesAmount: 200,
        },
        {
          id: travel.id,
          title: "Travel",
          colour: "#f97316",
          transactionsAmount: 1,
          totalExpensesAmount: 50,
        },
      ]),
    );
  });

  it("returns zero totals and no most used category when there are no transactions", async () => {
    const service = new TransactionService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);

    const summary = await service.summary(user.id, new Date("2026-08-16T00:00:00.000Z"));

    expect(summary).toMatchObject({
      totalIncomeMonthly: 0,
      totalExpensesMonthly: 0,
      totalBalance: 0,
      categories: [],
      totalCategoriesAmount: 0,
      totalTransactionsAmount: 0,
      mostUsedCategory: null,
    });
  });
});
