import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("CategoryService.find", (getContext) => {
  it("returns the persisted category by id", async () => {
    const service = new CategoryService(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
      },
    });

    const foundCategory = await service.find(category.id);

    expect(foundCategory).toMatchObject({
      id: category.id,
      title: "Food",
      description: "Groceries and restaurants",
      icon: "utensils",
      colour: "#22c55e",
    });
  });
});
