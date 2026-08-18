import { expect, it } from "vitest";
import { CategoryService } from "../../../src/services/category.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";
import { createTestUser } from "../../helpers/user.js";

integrationRunner("CategoryService.create", (getContext) => {
  it("persists the category", async () => {
    const service = new CategoryService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);

    const category = await service.create(
      {
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
      },
      user.id,
    );

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
      userId: user.id,
    });
  });

  it("persists only allowed category fields", async () => {
    const service = new CategoryService(getContext().prisma);
    const user = await createTestUser(getContext().prisma);
    const otherUser = await createTestUser(getContext().prisma, "other@example.com");

    const category = await service.create(
      {
        id: "unsafe-category-id",
        title: "Food",
        description: "Groceries and restaurants",
        icon: "utensils",
        colour: "#22c55e",
        userId: otherUser.id,
        createdAt: new Date("2000-01-01T00:00:00.000Z"),
      } as never,
      user.id,
    );

    const persistedCategory = await getContext().prisma.category.findUniqueOrThrow({
      where: {
        id: category.id,
      },
    });

    expect(persistedCategory).toMatchObject({
      title: "Food",
      description: "Groceries and restaurants",
      icon: "utensils",
      colour: "#22c55e",
      userId: user.id,
    });
    expect(persistedCategory.id).not.toBe("unsafe-category-id");
    expect(persistedCategory.createdAt).not.toEqual(new Date("2000-01-01T00:00:00.000Z"));
  });
});
