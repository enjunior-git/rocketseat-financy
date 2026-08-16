import { expect, it } from "vitest";
import { TransactionType } from "../../../generated/prisma/enums.js";
import { TransactionService } from "../../../src/services/transaction.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("TransactionService.create", (getContext) => {
  it("persists the transaction", async () => {
    const service = new TransactionService(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Salary",
        description: "Work income",
        icon: "briefcase",
        colour: "#0ea5e9",
      },
    });

    const transaction = await service.create({
      description: "August paycheck",
      date: new Date("2026-08-01T00:00:00.000Z"),
      amount: 5000,
      categoryId: category.id,
      type: TransactionType.income,
    });

    const persistedTransaction = await getContext().prisma.transaction.findUnique({
      where: {
        id: transaction.id,
      },
    });

    expect(persistedTransaction).toMatchObject({
      id: transaction.id,
      description: "August paycheck",
      date: new Date("2026-08-01T00:00:00.000Z"),
      amount: 5000,
      categoryId: category.id,
      type: TransactionType.income,
    });
  });
});
