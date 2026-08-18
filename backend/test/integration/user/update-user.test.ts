import { expect, it } from "vitest";
import { UserService } from "../../../src/services/user.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("UserService.update", (getContext) => {
  it("updates only the user name", async () => {
    const service = new UserService(getContext().prisma);
    const user = await service.create({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "original-password",
    });

    await service.update(user.id, {
      name: "Jane Updated",
      password: "unsafe-password",
    } as never);

    const persistedUser = await getContext().prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });

    expect(persistedUser).toMatchObject({
      name: "Jane Updated",
      password: "original-password",
    });
  });
});
