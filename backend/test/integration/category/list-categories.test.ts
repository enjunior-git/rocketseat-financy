import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("CategoryService.list", (getContext) => {
  it("returns only the persisted categories for the user", async () => {
    const service = new CategoryService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);
    const otherUser = await createTestUser(getContext().prisma, "other@example.com");
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
        userId: user.id,
      },
    });
    await getContext().prisma.category.create({
      data: {
        title: "Travel",
        description: "Transport",
        icon: "plane",
        colour: "#f97316",
        userId: otherUser.id,
      },
    });

    const categories = await service.list(user.id);

    expect(categories).toMatchObject([
      {
        id: category.id,
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
        userId: user.id,
      },
    ]);
  });
});
