import { expect, type Page } from "@playwright/test";

class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/dashboard$/);
    await expect(this.page.getByRole("heading", { name: "Recent transactions" })).toBeVisible();
  }
}

export { DashboardPage };
