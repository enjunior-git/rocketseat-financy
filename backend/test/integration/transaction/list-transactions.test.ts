import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { TransactionService } from "../../../src/services/transaction.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("TransactionService.list", (getContext) => {
  it("returns the persisted transactions with category", async () => {
    const service = new TransactionService(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Salary",
        description: "Work income",
        icon: "briefcase",
        colour: "#0ea5e9",
      },
    });
    const transaction = await getContext().prisma.transaction.create({
      data: {
        description: "August paycheck",
        date: new Date("2026-08-01T00:00:00.000Z"),
        amount: 5000,
        categoryId: category.id,
        type: TransactionType.income,
      },
    });

    const transactions = await service.list();

    expect(transactions).toMatchObject([
      {
        id: transaction.id,
        description: "August paycheck",
        amount: 5000,
        categoryId: category.id,
        type: TransactionType.income,
        category: {
          id: category.id,
          title: "Salary",
        },
      },
    ]);
  });
});
