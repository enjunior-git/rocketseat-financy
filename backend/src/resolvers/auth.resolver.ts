import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthResponse, LoginRequest, RegisterRequest } from "../dtos/auth.dto.js";
import { createPrismaClient } from "../lib/prisma.js";
import { AuthService } from "../services/auth.service.js";

@Resolver()
export class AuthResolver {
  private authService = new AuthService(createPrismaClient());

  @Mutation(() => AuthResponse)
  async register(@Arg("data", () => RegisterRequest) data: RegisterRequest): Promise<AuthResponse> {
    return this.authService.register(data);
  }

  @Mutation(() => AuthResponse)
  async login(@Arg("data", () => LoginRequest) data: LoginRequest): Promise<AuthResponse> {
    return this.authService.login(data);
  }
}
