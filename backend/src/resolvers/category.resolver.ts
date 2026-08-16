import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../dtos/category.dto.js";
import { createPrismaClient } from "../lib/prisma.js";
import { CategoryModel } from "../models/category.model.js";
import { TransactionModel } from "../models/transaction.model.js";
import { CategoryService } from "../services/category.service.js";
import { TransactionService } from "../services/transaction.service.js";

@Resolver(() => CategoryModel)
export class CategoryResolver {
  private prisma = createPrismaClient();
  private categoryService = new CategoryService(this.prisma);
  private transactionService = new TransactionService(this.prisma);

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryRequest) data: CreateCategoryRequest,
  ): Promise<CategoryModel> {
    return this.categoryService.create(data);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryRequest) data: UpdateCategoryRequest,
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data);
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return this.categoryService.list();
  }

  @Query(() => CategoryModel, { nullable: true })
  async findCategory(@Arg("id", () => String) id: string): Promise<CategoryModel | null> {
    return this.categoryService.find(id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => String) id: string): Promise<boolean> {
    await this.categoryService.delete(id);

    return true;
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    const transactions = await this.transactionService.list();

    return transactions.filter((transaction) => transaction.categoryId === category.id);
  }
}
