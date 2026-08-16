import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createPrismaClient } from "../lib/prisma.js";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../dtos/transaction.dto.js";
import { TransactionModel } from "../models/transaction.model.js";
import { TransactionService } from "../services/transaction.service.js";

@Resolver(() => TransactionModel)
export class TransactionResolver {
  private transactionService = new TransactionService(createPrismaClient());

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionRequest) data: CreateTransactionRequest
  ): Promise<TransactionModel> {
    return this.transactionService.create(data);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionRequest) data: UpdateTransactionRequest
  ): Promise<TransactionModel> {
    return this.transactionService.update(id, data);
  }

  @Query(() => [TransactionModel])
  async listTransactions(): Promise<TransactionModel[]> {
    return this.transactionService.list();
  }

  @Query(() => TransactionModel, { nullable: true })
  async findTransaction(@Arg("id", () => String) id: string): Promise<TransactionModel | null> {
    return this.transactionService.find(id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(@Arg("id", () => String) id: string): Promise<boolean> {
    await this.transactionService.delete(id);

    return true;
  }
}
