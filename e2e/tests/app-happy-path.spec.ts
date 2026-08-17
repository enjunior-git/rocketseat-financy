import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard-page";
import { EditProfilePage } from "../pages/edit-profile-page";
import { LoginPage } from "../pages/login-page";
import { RegisterPage } from "../pages/register-page";

test("App Happy Path", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const editProfilePage = new EditProfilePage(page);

  const email = `happy-path-${Date.now()}@example.com`;
  const password = "secret123";

  test("Registration", async () => {
    await registerPage.open();
    await registerPage.registerUser({
      name: "Happy Path",
      email,
      password,
    });

    await dashboardPage.expectCurrentPage();
    await dashboardPage.expectSignedIn();
  });

  test("Logout", async () => {
    await dashboardPage.openProfile();

    await editProfilePage.expectCurrentPage();
    await editProfilePage.signOut();

    await loginPage.expectCurrentPage();
    await loginPage.expectSignedOut();
  });

  test("Login", async () => {
    await loginPage.loginUser({ email, password });

    await dashboardPage.expectCurrentPage();
    await dashboardPage.expectSignedIn();
  });
});
