import { expect, test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard-page";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";

test.describe("Auth redirects", () => {
  test("redirects unauthenticated users from the index to login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("/");

    await loginPage.expectCurrentPage();
  });

  test("redirects unauthenticated users from authenticated pages to login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("/dashboard");

    await loginPage.expectCurrentPage();
  });

  test("redirects authenticated users from the index to dashboard", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const dashboardPage = new DashboardPage(page);

    await registerPage.open();
    await registerPage.registerUser({
      name: "Redirect User",
      email: `redirect-${Date.now()}@example.com`,
      password: "secret123",
    });
    await dashboardPage.expectCurrentPage();

    await page.goto("/");

    await expect(page).toHaveURL(/\/dashboard$/);
  });
});
