import { test, expect } from "@playwright/test";

test.describe("Authentication and Submit Tool Features", () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto("/login");
  });

  test("should display sign out button in navbar when user is authenticated", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click("button:has-text('Sign In')");

    await page.waitForNavigation();

    const signOutButton = page.locator("button:has-text('Sign Out')");
    await expect(signOutButton).toBeVisible();
  });

  test("should successfully sign out and redirect to login", async ({ page }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click("button:has-text('Sign In')");

    await page.waitForNavigation();

    const signOutButton = page.locator("button:has-text('Sign Out')");
    await signOutButton.click();

    await page.waitForNavigation();

    expect(page.url()).toContain("/login");
  });

  test("should show sign out button on mobile menu when user is authenticated", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click("button:has-text('Sign In')");

    await page.waitForNavigation();

    const menuButton = page.locator("button").filter({ has: page.locator("svg") }).last();
    await menuButton.click();

    const mobileSignOutButton = page.locator("button:has-text('Sign Out')");
    await expect(mobileSignOutButton).toBeVisible();
  });
});

test.describe("Submit Tool Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click("button:has-text('Sign In')");
    await page.waitForNavigation();
  });

  test("should open and close submit tool modal", async ({ page }) => {
    await page.goto("/community");

    const submitButton = page.locator("button:has-text('Submit a Tool')");
    await submitButton.click();

    const modal = page.locator("text=Submit a New Tool");
    await expect(modal).toBeVisible();

    const closeButton = page.locator("button").filter({ has: page.locator("svg") }).first();
    await closeButton.click();

    await expect(modal).not.toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    await page.goto("/community");

    const submitButton = page.locator("button:has-text('Submit a Tool')");
    await submitButton.click();

    const submitFormButton = page.locator("button:has-text('Submit for Review')");
    await submitFormButton.click();

    const errorToast = page.locator("text=Please select a category");
    await expect(errorToast).toBeVisible();
  });

  test("should successfully submit a tool with all fields", async ({ page }) => {
    await page.goto("/community");

    const submitButton = page.locator("button:has-text('Submit a Tool')");
    await submitButton.click();

    const toolNameInput = page.locator('input[placeholder*="Excalidraw"]');
    const urlInput = page.locator('input[placeholder*="https://example.com"]');
    const descriptionInput = page.locator('textarea[placeholder*="What makes"]');
    const tagsInput = page.locator('input[placeholder*="design, productivity"]');
    const githubInput = page.locator('input[placeholder*="github.com"]');

    await toolNameInput.fill("Test Tool");
    await urlInput.fill("https://testtool.com");

    const categorySelect = page.locator('button[role="combobox"]').first();
    await categorySelect.click();
    await page.locator("text=Development").click();

    await descriptionInput.fill("This is a test tool for development");
    await tagsInput.fill("test, development, productivity");
    await githubInput.fill("https://github.com/test/repo");

    const submitFormButton = page.locator("button:has-text('Submit for Review')");
    await submitFormButton.click();

    const successToast = page.locator("text=Submission received");
    await expect(successToast).toBeVisible();
  });

  test("should submit tool with optional fields empty", async ({ page }) => {
    await page.goto("/community");

    const submitButton = page.locator("button:has-text('Submit a Tool')");
    await submitButton.click();

    const toolNameInput = page.locator('input[placeholder*="Excalidraw"]');
    const urlInput = page.locator('input[placeholder*="https://example.com"]');
    const descriptionInput = page.locator('textarea[placeholder*="What makes"]');

    await toolNameInput.fill("Test Tool 2");
    await urlInput.fill("https://testtool2.com");

    const categorySelect = page.locator('button[role="combobox"]').first();
    await categorySelect.click();
    await page.locator("text=Design").click();

    await descriptionInput.fill("This is another test tool");

    const submitFormButton = page.locator("button:has-text('Submit for Review')");
    await submitFormButton.click();

    const successToast = page.locator("text=Submission received");
    await expect(successToast).toBeVisible();
  });

  test("should properly parse comma-separated tags", async ({ page }) => {
    await page.goto("/community");

    const submitButton = page.locator("button:has-text('Submit a Tool')");
    await submitButton.click();

    const toolNameInput = page.locator('input[placeholder*="Excalidraw"]');
    const urlInput = page.locator('input[placeholder*="https://example.com"]');
    const descriptionInput = page.locator('textarea[placeholder*="What makes"]');
    const tagsInput = page.locator('input[placeholder*="design, productivity"]');

    await toolNameInput.fill("Tag Test Tool");
    await urlInput.fill("https://tagtesttool.com");

    const categorySelect = page.locator('button[role="combobox"]').first();
    await categorySelect.click();
    await page.locator("text=AI Tools").click();

    await descriptionInput.fill("Testing tag parsing");
    await tagsInput.fill("tag1, tag2, tag3");

    const submitFormButton = page.locator("button:has-text('Submit for Review')");
    await submitFormButton.click();

    const successToast = page.locator("text=Submission received");
    await expect(successToast).toBeVisible();
  });
});
