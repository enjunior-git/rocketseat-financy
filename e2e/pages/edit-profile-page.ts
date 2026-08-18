import { expect, type Page } from "@playwright/test";

class EditProfilePage {
  constructor(private readonly page: Page) {}

  async expectCurrentPage(name = "Test Account") {
    await expect(this.page).toHaveURL(/\/profile$/);
    await expect(this.page.getByRole("heading", { name })).toBeVisible();
  }

  async editName(name: string) {
    await this.page.getByLabel("Full name").fill(name);
    await this.page.getByRole("button", { name: "Save changes" }).click();
  }

  async expectUserAvatarInitials(initials: string) {
    await expect(this.page.getByLabel(`User avatar ${initials}`)).toHaveCount(2);
  }

  async signOut() {
    await this.page.getByRole("button", { name: "Sign out" }).click();
  }
}

export { EditProfilePage };
