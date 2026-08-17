import { expect, it } from "vitest";
import { AuthService } from "../../../src/services/auth.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("AuthService.login", (getContext) => {
  it("returns tokens for valid credentials", async () => {
    process.env.JWT_SECRET = "test-secret";
    const service = new AuthService(getContext().prisma);

    await service.register({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "secret123",
    });

    const response = await service.login({
      email: "jane.doe@example.com",
      password: "secret123",
    });

    expect(response.user).toMatchObject({
      name: "Jane Doe",
      email: "jane.doe@example.com",
    });
    expect(response.token).toEqual(expect.any(String));
    expect(response.refreshToken).toEqual(expect.any(String));
  });

  it("rejects invalid credentials", async () => {
    process.env.JWT_SECRET = "test-secret";
    const service = new AuthService(getContext().prisma);

    await service.register({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "secret123",
    });

    await expect(
      service.login({
        email: "jane.doe@example.com",
        password: "wrong-password",
      }),
    ).rejects.toThrow("Invalid email or password");
  });
});
