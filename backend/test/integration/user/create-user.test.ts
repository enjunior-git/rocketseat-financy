import { expect, it } from "vitest";
import { Role } from "../../../generated/prisma/enums.js";
import { UserService } from "../../../src/services/user.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("UserService.create", (getContext) => {
  it("persists the user with the default role", async () => {
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
      role: Role.member,
      password: null,
    });
  });
});
