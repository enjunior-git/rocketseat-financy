import type { Prisma, PrismaClient, Transaction } from "../../generated/prisma/client.js";
import type { TransactionType } from "../../generated/prisma/enums.js";

export type CreateTransactionInput = {
  description: string;
  date: Date;
  amount: number;
  categoryId: string;
  type: TransactionType;
};

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: {
    category: true;
  };
}>;

export class TransactionService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateTransactionInput): Promise<Transaction> {
    await this.assertCategoryExists(input.categoryId);

    return this.prisma.transaction.create({
      data: input
    });
  }

  async list(): Promise<TransactionWithCategory[]> {
    return this.prisma.transaction.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  }

  async find(id: string): Promise<TransactionWithCategory | null> {
    return this.prisma.transaction.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    });
  }

  async update(id: string, input: UpdateTransactionInput): Promise<Transaction> {
    const transaction = await this.find(id);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    if (input.categoryId) {
      await this.assertCategoryExists(input.categoryId);
    }

    return this.prisma.transaction.update({
      where: {
        id
      },
      data: {
        description: input.description ?? transaction.description,
        date: input.date ?? transaction.date,
        amount: input.amount ?? transaction.amount,
        categoryId: input.categoryId ?? transaction.categoryId,
        type: input.type ?? transaction.type
      }
    });
  }

  async delete(id: string): Promise<Transaction> {
    const transaction = await this.find(id);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return this.prisma.transaction.delete({
      where: {
        id
      }
    });
  }

  private async assertCategoryExists(categoryId: string): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }
}
