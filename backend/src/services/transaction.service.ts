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

export type CategoryTransactionSummary = {
  id: string;
  title: string;
  colour: string;
  transactionsAmount: number;
  totalExpensesAmount: number;
};

export type TransactionSummary = {
  totalIncomeMonthly: number;
  totalExpensesMonthly: number;
  totalBalance: number;
  categories: CategoryTransactionSummary[];
  totalCategoriesAmount: number;
  totalTransactionsAmount: number;
  mostUsedCategory: CategoryTransactionSummary | null;
};

export class TransactionService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateTransactionInput): Promise<Transaction> {
    await this.assertCategoryExists(input.categoryId);

    return this.prisma.transaction.create({
      data: input,
    });
  }

  async list(): Promise<TransactionWithCategory[]> {
    return this.prisma.transaction.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async find(id: string): Promise<TransactionWithCategory | null> {
    return this.prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  async summary(referenceDate = new Date()): Promise<TransactionSummary> {
    const monthStart = new Date(
      Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), 1),
    );
    const nextMonthStart = new Date(
      Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth() + 1, 1),
    );

    const categories = await this.prisma.category.findMany({
      include: {
        transactions: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const transactions = categories.flatMap((category) => category.transactions);
    const monthlyTransactions = transactions.filter(
      (transaction) => transaction.date >= monthStart && transaction.date < nextMonthStart,
    );
    const totalIncomeMonthly = this.sumTransactionsByType(monthlyTransactions, "income");
    const totalExpensesMonthly = this.sumTransactionsByType(monthlyTransactions, "expense");
    const totalIncome = this.sumTransactionsByType(transactions, "income");
    const totalExpenses = this.sumTransactionsByType(transactions, "expense");
    const categorySummaries = categories.map((category) => ({
      id: category.id,
      title: category.title,
      colour: category.colour,
      transactionsAmount: category.transactions.length,
      totalExpensesAmount: this.sumTransactionsByType(category.transactions, "expense"),
    }));

    return {
      totalIncomeMonthly,
      totalExpensesMonthly,
      totalBalance: totalIncome - totalExpenses,
      categories: categorySummaries,
      totalCategoriesAmount: categories.length,
      totalTransactionsAmount: transactions.length,
      mostUsedCategory: this.findMostUsedCategory(categorySummaries),
    };
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
        id,
      },
      data: {
        description: input.description ?? transaction.description,
        date: input.date ?? transaction.date,
        amount: input.amount ?? transaction.amount,
        categoryId: input.categoryId ?? transaction.categoryId,
        type: input.type ?? transaction.type,
      },
    });
  }

  async delete(id: string): Promise<Transaction> {
    const transaction = await this.find(id);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return this.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }

  private async assertCategoryExists(categoryId: string): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  private sumTransactionsByType(transactions: Transaction[], type: TransactionType): number {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  private findMostUsedCategory(
    categories: CategoryTransactionSummary[],
  ): CategoryTransactionSummary | null {
    const categoriesWithTransactions = categories.filter(
      (category) => category.transactionsAmount > 0,
    );

    if (categoriesWithTransactions.length === 0) {
      return null;
    }

    return categoriesWithTransactions.reduce((mostUsedCategory, category) => {
      if (category.transactionsAmount <= mostUsedCategory.transactionsAmount) {
        return mostUsedCategory;
      }

      return category;
    });
  }
}
