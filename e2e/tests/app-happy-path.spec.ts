import { test } from "@playwright/test";
import { CategoriesPage } from "../pages/categories-page";
import { DashboardPage } from "../pages/dashboard-page";
import { EditProfilePage } from "../pages/edit-profile-page";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";
import { TransactionsPage } from "../pages/transactions-page";

test.describe("App Happy Path", () => {
  test("registers, manages categories, logs out, and logs back in", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const editProfilePage = new EditProfilePage(page);
    const categoriesPage = new CategoriesPage(page);
    const transactionsPage = new TransactionsPage(page);

    const email = `happy-path-${Date.now()}@example.com`;
    const password = "secret123";
    const category = {
      title: `Food ${Date.now()}`,
      description: "Restaurants and delivery",
    };
    const transaction = {
      amount: "89.50",
      date: "2026-08-17",
      description: `Dinner ${Date.now()}`,
    };

    await test.step("Registration", async () => {
      await registerPage.open();
      await registerPage.registerUser({
        name: "Happy Path",
        email,
        password,
      });

      await dashboardPage.expectCurrentPage();
      await dashboardPage.expectSignedIn();
    });

    await test.step("Logout", async () => {
      await dashboardPage.openProfile();

      await editProfilePage.expectCurrentPage();
      await editProfilePage.signOut();

      await loginPage.expectCurrentPage();
      await loginPage.expectSignedOut();
    });

    await test.step("Login", async () => {
      await loginPage.loginUser({ email, password });

      await dashboardPage.expectCurrentPage();
      await dashboardPage.expectSignedIn();
    });

    await test.step("Create category", async () => {
      await categoriesPage.open();
      await categoriesPage.expectCurrentPage();
      await categoriesPage.createCategory(category);
      await categoriesPage.expectCategoryVisible(category);
    });

    await test.step("Create transaction", async () => {
      await transactionsPage.open();
      await transactionsPage.expectCurrentPage();
      await transactionsPage.createTransaction(transaction);
      await transactionsPage.expectTransactionVisible(transaction);
    });
  });
});
