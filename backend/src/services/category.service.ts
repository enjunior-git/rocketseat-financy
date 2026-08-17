import type { Category, PrismaClient } from "../../generated/prisma/client.js";

export type CreateCategoryInput = {
  title: string;
  description: string;
  icon: string;
  colour: string;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export class CategoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateCategoryInput, userId: string): Promise<Category> {
    return this.prisma.category.create({
      data: {
        ...input,
        userId,
      },
    });
  }

  async list(userId: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async find(id: string, userId: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async countTransactions(categoryId: string, userId: string): Promise<number> {
    return this.prisma.transaction.count({
      where: {
        categoryId,
        userId,
      },
    });
  }

  async sumExpenses(categoryId: string, userId: string): Promise<number> {
    const aggregate = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        categoryId,
        userId,
        type: "expense",
      },
    });

    return aggregate._sum.amount ?? 0;
  }

  async update(id: string, input: UpdateCategoryInput, userId: string): Promise<Category> {
    const category = await this.find(id, userId);

    if (!category) {
      throw new Error("Category not found");
    }

    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        title: input.title ?? category.title,
        description: input.description ?? category.description,
        icon: input.icon ?? category.icon,
        colour: input.colour ?? category.colour,
      },
    });
  }

  async delete(id: string, userId: string): Promise<Category> {
    const category = await this.find(id, userId);

    if (!category) {
      throw new Error("Category not found");
    }

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
