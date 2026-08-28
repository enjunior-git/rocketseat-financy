import request from "supertest";
import { expect, it, vi } from "vitest";
import { e2eRunner } from "../helpers/e2e-runner.js";

const expectGraphqlErrorMessage = (error: unknown, message: string) => {
  expect(error).toEqual({ message });
};

e2eRunner("Auth GraphQL", (getContext) => {
  it("registers and logs in a user", async () => {
    const registerResponse = await request(getContext().app)
      .post("/graphql")
      .send({
        query: registerMutation,
        variables: {
          data: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            password: "secret123",
          },
        },
      });

    expect(registerResponse.status).toBe(200);
    expect(registerResponse.body.errors).toBeUndefined();
    expect(registerResponse.body.data.register).toMatchObject({
      token: expect.any(String),
      refreshToken: expect.any(String),
      user: {
        id: expect.any(String),
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
    });

    const loginResponse = await request(getContext().app)
      .post("/graphql")
      .send({
        query: loginMutation,
        variables: {
          data: {
            email: "jane.doe@example.com",
            password: "secret123",
          },
        },
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.errors).toBeUndefined();
    expect(loginResponse.body.data.login).toMatchObject({
      token: expect.any(String),
      refreshToken: expect.any(String),
      user: {
        id: registerResponse.body.data.register.user.id,
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
    });
  });

  it("rejects invalid login credentials", async () => {
    const response = await request(getContext().app)
      .post("/graphql")
      .send({
        query: loginMutation,
        variables: {
          data: {
            email: "missing@example.com",
            password: "secret123",
          },
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeNull();
    expectGraphqlErrorMessage(response.body.errors[0], "Invalid email or password");
  });

  it("returns the safe duplicate-user message", async () => {
    const data = {
      name: "Duplicate User",
      email: "duplicate@example.com",
      password: "secret123",
    };

    await request(getContext().app).post("/graphql").send({
      query: registerMutation,
      variables: {
        data,
      },
    });

    const response = await request(getContext().app).post("/graphql").send({
      query: registerMutation,
      variables: {
        data,
      },
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeNull();
    expectGraphqlErrorMessage(response.body.errors[0], "User already exists");
  });

  it("rejects unknown fields when updating a user", async () => {
    const registerResponse = await request(getContext().app)
      .post("/graphql")
      .send({
        query: registerMutation,
        variables: {
          data: {
            name: "Profile User",
            email: "profile@example.com",
            password: "secret123",
          },
        },
      });
    const token = registerResponse.body.data.register.token;

    const response = await request(getContext().app)
      .post("/graphql")
      .set("authorization", `Bearer ${token}`)
      .send({
        query: updateUserMutation,
        variables: {
          data: {
            name: "Profile Updated",
            password: "unsafe-password",
          },
        },
      });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toContain(
      'Field "password" is not defined by type "UpdateUserRequest"',
    );
    expect(response.body.errors[0].locations).toBeUndefined();
    expect(response.body.errors[0].path).toBeUndefined();
    expect(response.body.errors[0].extensions).toBeUndefined();
  });

  it("masks and logs unknown auth errors", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      await getContext().prisma.$executeRawUnsafe('DROP TABLE "User"');

      const response = await request(getContext().app)
        .post("/graphql")
        .send({
          query: loginMutation,
          variables: {
            data: {
              email: "missing@example.com",
              password: "secret123",
            },
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeNull();
      expectGraphqlErrorMessage(
        response.body.errors[0],
        "Unknown error, please contact our support",
      );
      expect(consoleError).toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
    }
  });
});

const registerMutation = `#graphql
  mutation Register($data: RegisterRequest!) {
    register(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;

const loginMutation = `#graphql
  mutation Login($data: LoginRequest!) {
    login(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;

const updateUserMutation = `#graphql
  mutation UpdateUser($data: UpdateUserRequest!) {
    updateUser(data: $data) {
      id
      name
      email
    }
  }
`;
