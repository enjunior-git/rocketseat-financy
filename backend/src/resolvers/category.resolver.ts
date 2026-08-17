import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../dtos/category.dto.js";
import { GqlUser } from "../graphql/user.decorator.js";
import { createPrismaClient } from "../lib/prisma.js";
import { IsAuth } from "../middlewares/auth.middleware.js";
import { CategoryModel } from "../models/category.model.js";
import { TransactionModel } from "../models/transaction.model.js";
import type { UserModel } from "../models/user.model.js";
import { CategoryService } from "../services/category.service.js";
import { TransactionService } from "../services/transaction.service.js";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private prisma = createPrismaClient();
  private categoryService = new CategoryService(this.prisma);
  private transactionService = new TransactionService(this.prisma);

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryRequest) data: CreateCategoryRequest,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryRequest) data: UpdateCategoryRequest,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data, user.id);
  }

  @Query(() => [CategoryModel])
  async listCategories(@GqlUser() user: UserModel): Promise<CategoryModel[]> {
    return this.categoryService.list(user.id);
  }

  @Query(() => CategoryModel, { nullable: true })
  async findCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel | null> {
    return this.categoryService.find(id, user.id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<boolean> {
    await this.categoryService.delete(id, user.id);

    return true;
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    const transactions = await this.transactionService.list(category.userId);

    return transactions.filter((transaction) => transaction.categoryId === category.id);
  }

  @FieldResolver(() => Number)
  async transactionsAmount(@Root() category: CategoryModel): Promise<number> {
    return this.categoryService.countTransactions(category.id, category.userId);
  }

  @FieldResolver(() => Number)
  async totalExpensesAmount(@Root() category: CategoryModel): Promise<number> {
    return this.categoryService.sumExpenses(category.id, category.userId);
  }
}
