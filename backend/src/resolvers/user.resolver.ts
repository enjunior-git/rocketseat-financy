import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { UpdateUserRequest } from "../dtos/user.dto.js";
import { GqlUser } from "../graphql/user.decorator.js";
import { createPrismaClient } from "../lib/prisma.js";
import { IsAuth } from "../middlewares/auth.middleware.js";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService = new UserService(createPrismaClient());

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserRequest) data: UpdateUserRequest,
    @GqlUser() user: UserModel,
  ): Promise<UserModel> {
    return this.userService.update(user.id, {
      name: data.name,
    });
  }
}
