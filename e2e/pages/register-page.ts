import type { Page } from "@playwright/test";

type RegisterUserInput = {
  email: string;
  name: string;
  password: string;
};

class RegisterPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto("/register");
  }

  async registerUser({ email, name, password }: RegisterUserInput) {
    await this.page.getByLabel("Full name").fill(name);
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Create account" }).click();
  }
}

export type { RegisterUserInput };
export { RegisterPage };
