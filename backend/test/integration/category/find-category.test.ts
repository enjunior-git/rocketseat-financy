import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("CategoryService.find", (getContext) => {
  it("returns the persisted category by id", async () => {
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

    const foundCategory = await service.find(category.id, user.id);

    expect(foundCategory).toMatchObject({
      id: category.id,
      title: "Food",
      description: "Groceries and restaurants",
      icon: "utensils",
      colour: "#22c55e",
      userId: user.id,
    });
  });

  it("does not return another user's category", async () => {
    const service = new CategoryService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);
    const otherUser = await createTestUser(getContext().prisma, "other@example.com");
    const category = await getContext().prisma.category.create({
      data: {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
        userId: otherUser.id,
      },
    });

    await expect(service.find(category.id, user.id)).resolves.toBeNull();
  });
});
