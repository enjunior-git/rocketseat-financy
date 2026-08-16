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

  async create(input: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({
      data: input
    });
  }

  async list(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
  }

  async find(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, input: UpdateCategoryInput): Promise<Category> {
    const category = await this.find(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return this.prisma.category.update({
      where: {
        id
      },
      data: {
        title: input.title ?? category.title,
        description: input.description ?? category.description,
        icon: input.icon ?? category.icon,
        colour: input.colour ?? category.colour
      }
    });
  }

  async delete(id: string): Promise<Category> {
    const category = await this.find(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return this.prisma.category.delete({
      where: {
        id
      }
    });
  }
}
