import { expect, type Page } from "@playwright/test";

type CreateTransactionInput = {
  amount: string;
  date: string;
  description: string;
};

class TransactionsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.getByRole("link", { name: "Transactions" }).click();
  }

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/transactions$/);
    await expect(this.page.getByRole("heading", { name: "Transactions" })).toBeVisible();
  }

  async createTransaction({ amount, date, description }: CreateTransactionInput) {
    await this.page.getByRole("button", { name: "New transaction" }).click();
    await this.page.getByLabel("Description").fill(description);
    await this.page.getByLabel("Date").fill(date);
    await this.page.getByLabel("Amount").fill(amount);
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async expectTransactionVisible({ amount, description }: CreateTransactionInput) {
    await expect(this.page.getByText(description)).toBeVisible();
    await expect(this.page.getByText(`- R$ ${amount.replace(".", ",")}`)).toBeVisible();
  }
}

export type { CreateTransactionInput };
export { TransactionsPage };
