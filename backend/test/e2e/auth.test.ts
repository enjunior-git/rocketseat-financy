import request from "supertest";
import { expect, it } from "vitest";
import { e2eRunner } from "../helpers/e2e-runner.js";

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
    expect(response.body.errors[0].message).toBe("Invalid email or password");
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
