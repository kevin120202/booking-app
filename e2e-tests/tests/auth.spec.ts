import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
    await page.goto(UI_URL);

    // Get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click()

    // Expect a title "to contain" a substring.
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible()

    // Locate sign in inputs
    await page.locator("[name=email]").fill("1@1.com")
    await page.locator("[name=password]").fill("password123")

    // Click login button
    await page.getByRole("button", { name: "Sign In" }).click()

    // Expect toast pop up and links change
    await expect(page.getByText("Signed In!")).toBeVisible()
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()
});

test("should allow user to register", async ({ page }) => {
    const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 10000}@test.com`

    await page.goto(UI_URL)

    // Get the sign in button, click on create an account and expect a header
    await page.getByRole("link", { name: "Sign In" }).click()
    await page.getByRole("link", { name: "Create an account here" }).click()
    await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible()

    // Register
    await page.locator("[name=firstName]").fill("test_firstName")
    await page.locator("[name=lastName]").fill("test_lastName")
    await page.locator("[name=email]").fill(testEmail)
    await page.locator("[name=password]").fill("password123")
    await page.locator("[name=confirmPassword]").fill("password123")

    // Click create account
    await page.getByRole("button", { name: "Create Account" }).click()

    // Expect toast pop up and links change
    await expect(page.getByText("Registration Success!")).toBeVisible()
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()
})
