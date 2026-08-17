import { Arg, GraphQLISODateTime, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../dtos/transaction.dto.js";
import { GqlUser } from "../graphql/user.decorator.js";
import { createPrismaClient } from "../lib/prisma.js";
import { IsAuth } from "../middlewares/auth.middleware.js";
import { TransactionModel } from "../models/transaction.model.js";
import { TransactionSummaryModel } from "../models/transaction-summary.model.js";
import type { UserModel } from "../models/user.model.js";
import { TransactionService } from "../services/transaction.service.js";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService(createPrismaClient());

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionRequest) data: CreateTransactionRequest,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.create(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionRequest) data: UpdateTransactionRequest,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.update(id, data, user.id);
  }

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: UserModel): Promise<TransactionModel[]> {
    return this.transactionService.list(user.id);
  }

  @Query(() => TransactionModel, { nullable: true })
  async findTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel | null> {
    return this.transactionService.find(id, user.id);
  }

  @Query(() => TransactionSummaryModel)
  async transactionSummary(
    @GqlUser() user: UserModel,
    @Arg("month", () => GraphQLISODateTime, { nullable: true }) month?: Date,
  ): Promise<TransactionSummaryModel> {
    return this.transactionService.summary(user.id, month);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<boolean> {
    await this.transactionService.delete(id, user.id);

    return true;
  }
}
