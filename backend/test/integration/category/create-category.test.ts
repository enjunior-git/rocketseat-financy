import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("CategoryService.create", (getContext) => {
  it("persists the category", async () => {
    const service = new CategoryService(getContext().prisma);

    const category = await service.create({
      title: "Food",
      description: "Groceries and restaurants",
      icon: "utensils",
      colour: "#22c55e",
    });

    const persistedCategory = await getContext().prisma.category.findUnique({
      where: {
        id: category.id,
      },
    });

    expect(persistedCategory).toMatchObject({
      id: category.id,
      title: "Food",
      description: "Groceries and restaurants",
      icon: "utensils",
      colour: "#22c55e",
    });
  });
});
