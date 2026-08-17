import { expect, type Page } from "@playwright/test";

type LoginUserInput = {
  email: string;
  password: string;
};

class LoginPage {
  constructor(private readonly page: Page) {}

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  }

  async expectSignedOut() {
    await expect
      .poll(() =>
        this.page.evaluate(() => {
          const storedAuth = window.localStorage.getItem("auth-storage");
          const token = storedAuth ? JSON.parse(storedAuth).state?.token : null;

          return token ?? null;
        }),
      )
      .toBeNull();
  }

  async loginUser({ email, password }: LoginUserInput) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}

export type { LoginUserInput };
export { LoginPage };
