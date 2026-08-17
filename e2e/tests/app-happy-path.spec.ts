import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard-page";
import { RegisterPage } from "../pages/register-page";

test("App Happy Path", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const dashboardPage = new DashboardPage(page);

  const email = `happy-path-${Date.now()}@example.com`;

  test("Registration", async () => {
    await registerPage.open();
    await registerPage.registerUser({
      name: "Happy Path",
      email,
      password: "secret123",
    });
    await dashboardPage.expectCurrentPage();
  });
});
