import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("CategoryService.delete", (getContext) => {
  it("removes the persisted category", async () => {
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

    await service.delete(category.id, user.id);

    const persistedCategory = await getContext().prisma.category.findUnique({
      where: {
        id: category.id,
      },
    });

    expect(persistedCategory).toBeNull();
  });
});
