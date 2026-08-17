import { expect, it } from "vitest";
import { comparePassword } from "../../../src/lib/hash.js";
import { verifyJwt } from "../../../src/lib/jwt.js";
import { AuthService } from "../../../src/services/auth.service.js";
import { integrationRunner } from "../../helpers/integration-runner.js";

integrationRunner("AuthService.register", (getContext) => {
  it("creates the user with a hashed password and returns tokens", async () => {
    process.env.JWT_SECRET = "test-secret";
    const service = new AuthService(getContext().prisma);

    const response = await service.register({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "secret123",
    });

    const persistedUser = await getContext().prisma.user.findUnique({
      where: {
        email: "jane.doe@example.com",
      },
    });

    expect(response.user).toMatchObject({
      id: persistedUser?.id,
      name: "Jane Doe",
      email: "jane.doe@example.com",
    });

    expect(response.token).toEqual(expect.any(String));
    expect(response.refreshToken).toEqual(expect.any(String));
    expect(persistedUser?.password).not.toBe("secret123");

    expect(await comparePassword("secret123", persistedUser?.password ?? "")).toBe(true);

    await expect(verifyJwt(response.token)).resolves.toMatchObject({
      id: persistedUser?.id,
      email: "jane.doe@example.com",
    });
  });

  it("rejects duplicate emails", async () => {
    process.env.JWT_SECRET = "test-secret";
    const service = new AuthService(getContext().prisma);

    await service.register({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "secret123",
    });

    await expect(
      service.register({
        name: "Jane Other",
        email: "jane.doe@example.com",
        password: "secret456",
      }),
    ).rejects.toThrow("User already exists");
  });
});
