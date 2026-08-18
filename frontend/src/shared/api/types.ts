export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  colour: string;
  transactionsAmount: number;
  totalExpensesAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryInput {
  title: string;
  description: string;
  icon: string;
  colour: string;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export type TransactionType = "expense" | "income";

export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionInput {
  description: string;
  date: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

export interface CategoryTransactionSummary {
  id: string;
  title: string;
  colour: string;
  transactionsAmount: number;
  totalExpensesAmount: number;
}

export interface TransactionSummary {
  totalIncomeMonthly: number;
  totalExpensesMonthly: number;
  totalBalance: number;
  categories: CategoryTransactionSummary[];
  totalCategoriesAmount: number;
  totalTransactionsAmount: number;
  mostUsedCategory: CategoryTransactionSummary | null;
}
