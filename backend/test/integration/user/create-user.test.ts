import { expect, it } from "vitest";
import { UserService } from "../../../src/services/user.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("UserService.create", (getContext) => {
  it("persists the user", async () => {
    const service = new UserService(getContext().prisma);

    const user = await service.create({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    const persistedUser = await getContext().prisma.user.findUnique({
      where: {
        email: "john.doe@example.com",
      },
    });

    expect(persistedUser).toMatchObject({
      id: user.id,
      name: "John Doe",
      email: "john.doe@example.com",
      password: null,
    });
  });

  it("persists only allowed user fields", async () => {
    const service = new UserService(getContext().prisma);

    const user = await service.create({
      id: "unsafe-user-id",
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date("2000-01-01T00:00:00.000Z"),
    } as never);

    const persistedUser = await getContext().prisma.user.findUniqueOrThrow({
      where: {
        email: "john.doe@example.com",
      },
    });

    expect(persistedUser).toMatchObject({
      id: user.id,
      name: "John Doe",
      email: "john.doe@example.com",
      password: null,
    });
    expect(persistedUser.id).not.toBe("unsafe-user-id");
    expect(persistedUser.createdAt).not.toEqual(new Date("2000-01-01T00:00:00.000Z"));
  });
});
