import type { PrismaClient, User } from "../../generated/prisma/client.js";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../dtos/auth.dto.js";
import { UserFacingError } from "../graphql/errors.js";
import { comparePassword, hashPassword } from "../lib/hash.js";
import { signJwt } from "../lib/jwt.js";

export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user?.password) {
      throw new UserFacingError("Invalid email or password");
    }

    const passwordsMatch = await comparePassword(data.password, user.password);

    if (!passwordsMatch) {
      throw new UserFacingError("Invalid email or password");
    }

    return this.generateTokens(user);
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new UserFacingError("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<AuthResponse> {
    const token = await signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "15m",
    );

    const refreshToken = await signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "1d",
    );

    return {
      token,
      refreshToken,
      user,
    };
  }
}
