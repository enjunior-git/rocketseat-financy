import { expect, type Page } from "@playwright/test";

class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/dashboard$/);
    await expect(this.page.getByRole("heading", { name: "Recent transactions" })).toBeVisible();
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

  async openProfile() {
    await this.page.getByRole("link", { name: "Edit profile" }).click();
  }
}

export { DashboardPage };
