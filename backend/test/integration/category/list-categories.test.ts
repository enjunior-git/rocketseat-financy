import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("CategoryService.list", (getContext) => {
  it("returns the persisted categories", async () => {
    const service = new CategoryService(getContext().prisma);
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
      },
    });

    const categories = await service.list();

    expect(categories).toMatchObject([
      {
        id: category.id,
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
      },
    ]);
  });
});
