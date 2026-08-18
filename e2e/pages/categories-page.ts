import { expect, type Page } from "@playwright/test";

type CreateCategoryInput = {
  title: string;
  description: string;
};

class CategoriesPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.getByRole("link", { name: "Categories" }).click();
  }

  async expectCurrentPage() {
    await expect(this.page).toHaveURL(/\/categories$/);
    await expect(this.page.getByRole("heading", { name: "Categories" })).toBeVisible();
  }

  async createCategory({ description, title }: CreateCategoryInput) {
    await this.page.getByRole("button", { name: "New category" }).click();
    await this.page.getByLabel("Title").fill(title);
    await this.page.getByLabel("Description").fill(description);
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async expectCategoryVisible({ description, title }: CreateCategoryInput) {
    await expect(this.page.getByRole("heading", { name: title })).toBeVisible();
    await expect(this.page.getByText(description)).toBeVisible();
    await expect(this.page.getByText("Total categories")).toBeVisible();
  }

  async editCategory({
    currentTitle,
    description,
    title,
  }: CreateCategoryInput & { currentTitle: string }) {
    await this.page.getByRole("button", { name: `Edit ${currentTitle}` }).click();
    await this.page.getByLabel("Title").fill(title);
    await this.page.getByLabel("Description").fill(description);
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async deleteCategory({ title }: Pick<CreateCategoryInput, "title">) {
    await this.page.getByRole("button", { name: `Delete ${title}` }).click();
    await this.page.getByRole("button", { name: "Delete", exact: true }).click();
  }

  async expectCategoryHidden({ description, title }: CreateCategoryInput) {
    await expect(this.page.getByRole("heading", { name: title })).toHaveCount(0);
    await expect(this.page.locator("main").getByText(description)).toHaveCount(0);
  }
}

export type { CreateCategoryInput };
export { CategoriesPage };
