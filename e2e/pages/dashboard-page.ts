import { expect, type Page } from "@playwright/test";

class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/dashboard$/);
    await expect(this.page.getByRole("heading", { name: "Recent transactions" })).toBeVisible();
  }

  async open() {
    await this.page.getByRole("link", { name: "Financy" }).click();
  }

  async expectListedData({
    categoryTitle,
    transactionAmount,
    transactionDescription,
  }: {
    categoryTitle: string;
    transactionAmount: string;
    transactionDescription: string;
  }) {
    await expect(this.page.getByText(transactionDescription)).toBeVisible();
    await expect(this.page.getByText(`- R$ ${transactionAmount.replace(".", ",")}`)).toBeVisible();
    await expect(this.page.getByText(categoryTitle).first()).toBeVisible();
    await expect(this.page.getByText("1 item")).toBeVisible();
    await expect(this.page.getByText("Monthly expenses")).toBeVisible();
  }

  async expectSignedIn() {
    await expect
      .poll(() =>
        this.page.evaluate(() => {
          const storedAuth = window.localStorage.getItem("auth-storage");
          const token = storedAuth ? JSON.parse(storedAuth).state?.token : null;

          return typeof token === "string" && token.length > 0;
        }),
      )
      .toBe(true);
  }

  async expectUserAvatarInitials(initials: string) {
    await expect(this.page.getByLabel(`User avatar ${initials}`)).toBeVisible();
  }

  async openProfile() {
    await this.page.getByRole("link", { name: "Edit profile" }).click();
  }
}

export { DashboardPage };
