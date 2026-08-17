import { expect, type Page } from "@playwright/test";

class EditProfilePage {
  constructor(private readonly page: Page) {}

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/profile$/);
    await expect(this.page.getByRole("heading", { name: "Test Account" })).toBeVisible();
  }

  async signOut() {
    await this.page.getByRole("button", { name: "Sign out" }).click();
  }
}

export { EditProfilePage };
