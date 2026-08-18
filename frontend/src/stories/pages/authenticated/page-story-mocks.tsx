import type { Decorator } from "@storybook/react-vite";
import type { DocumentNode } from "graphql";
import { useRef } from "react";

import { categoriesQueryKey } from "@/entities/category";
import { transactionSummaryQueryKey } from "@/entities/transaction";
import { transactionsQueryKey } from "@/entities/transaction";
import { apolloClient } from "@/shared/api/apollo";
import { queryClient } from "@/shared/lib/query-client";
import type { Category, Transaction, TransactionSummary } from "@/shared/api/types";

type PageQueryState = "default" | "error" | "loading";

const now = "2026-08-18T12:00:00.000Z";

const mockCategories: Category[] = [
  {
    id: "cat-food",
    title: "Food",
    description: "Meals, groceries, and snacks",
    icon: "food",
    colour: "blue",
    transactionsAmount: 2,
    totalExpensesAmount: 262.4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-work",
    title: "Work",
    description: "Salary and freelance income",
    icon: "work",
    colour: "green",
    transactionsAmount: 1,
    totalExpensesAmount: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-transport",
    title: "Transport",
    description: "Fuel, parking, public transit, and rides",
    icon: "transport",
    colour: "orange",
    transactionsAmount: 1,
    totalExpensesAmount: 84.9,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-shopping",
    title: "Shopping",
    description: "Clothes, household items, and personal purchases",
    icon: "shopping",
    colour: "pink",
    transactionsAmount: 1,
    totalExpensesAmount: 319.9,
    createdAt: now,
    updatedAt: now,
  },
];

const mockTransactions: Transaction[] = [
  {
    id: "trx-1",
    description: "Design retainer",
    date: "2026-08-02T00:00:00.000Z",
    amount: 5800,
    categoryId: "cat-work",
    type: "income",
    category: mockCategories[1],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "trx-2",
    description: "Groceries",
    date: "2026-08-05T00:00:00.000Z",
    amount: 187.5,
    categoryId: "cat-food",
    type: "expense",
    category: mockCategories[0],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "trx-3",
    description: "Fuel",
    date: "2026-08-09T00:00:00.000Z",
    amount: 84.9,
    categoryId: "cat-transport",
    type: "expense",
    category: mockCategories[2],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "trx-4",
    description: "Coffee with client",
    date: "2026-08-12T00:00:00.000Z",
    amount: 74.9,
    categoryId: "cat-food",
    type: "expense",
    category: mockCategories[0],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "trx-5",
    description: "Desk lamp",
    date: "2026-08-15T00:00:00.000Z",
    amount: 319.9,
    categoryId: "cat-shopping",
    type: "expense",
    category: mockCategories[3],
    createdAt: now,
    updatedAt: now,
  },
];

const mockTransactionSummary: TransactionSummary = {
  totalIncomeMonthly: 5800,
  totalExpensesMonthly: 667.2,
  totalBalance: 5132.8,
  totalCategoriesAmount: mockCategories.length,
  totalTransactionsAmount: mockTransactions.length,
  mostUsedCategory: {
    id: "cat-food",
    title: "Food",
    colour: "blue",
    transactionsAmount: 2,
    totalExpensesAmount: 262.4,
  },
  categories: [
    {
      id: "cat-food",
      title: "Food",
      colour: "blue",
      transactionsAmount: 2,
      totalExpensesAmount: 262.4,
    },
    {
      id: "cat-transport",
      title: "Transport",
      colour: "orange",
      transactionsAmount: 1,
      totalExpensesAmount: 84.9,
    },
    {
      id: "cat-shopping",
      title: "Shopping",
      colour: "pink",
      transactionsAmount: 1,
      totalExpensesAmount: 319.9,
    },
  ],
};

const pageQueryKeys = [categoriesQueryKey, transactionSummaryQueryKey, transactionsQueryKey];

function getOperationName(query: DocumentNode) {
  const definition = query.definitions.find((item) => item.kind === "OperationDefinition");

  return definition?.kind === "OperationDefinition" ? definition.name?.value : undefined;
}

function getMockData(operationName?: string) {
  if (operationName === "ListCategories") {
    return { listCategories: mockCategories };
  }

  if (operationName === "ListTransactions") {
    return { listTransactions: mockTransactions };
  }

  if (operationName === "TransactionSummary") {
    return { transactionSummary: mockTransactionSummary };
  }

  throw new Error(`No Storybook mock data configured for ${operationName ?? "unknown query"}.`);
}

function configurePageQueryState(state: PageQueryState) {
  queryClient.cancelQueries();
  queryClient.clear();

  for (const queryKey of pageQueryKeys) {
    queryClient.setQueryDefaults(queryKey, { retry: false });
  }

  apolloClient.query = ((options: { query: DocumentNode }) => {
    if (state === "loading") {
      return new Promise(() => undefined);
    }

    if (state === "error") {
      return Promise.reject(new Error("Unable to load page data. Try again in a moment."));
    }

    return Promise.resolve({
      data: getMockData(getOperationName(options.query)),
      loading: false,
      networkStatus: 7,
    });
  }) as typeof apolloClient.query;
}

const withPageQueryState = (state: PageQueryState): Decorator => {
  return (Story) => {
    const configuredRef = useRef(false);

    if (!configuredRef.current) {
      configurePageQueryState(state);
      configuredRef.current = true;
    }

    return <Story />;
  };
};

export { withPageQueryState };
