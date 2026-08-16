import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("CategoryService.update", (getContext) => {
  it("persists the updated category fields", async () => {
    const service = new CategoryService(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
      },
    });

    await service.update(category.id, {
      title: "Meals",
      colour: "#16a34a",
    });

    const persistedCategory = await getContext().prisma.category.findUnique({
      where: {
        id: category.id,
      },
    });

    expect(persistedCategory).toMatchObject({
      id: category.id,
      title: "Meals",
      description: "Groceries and restaurants",
      icon: "utensils",
      colour: "#16a34a",
    });
  });
});
