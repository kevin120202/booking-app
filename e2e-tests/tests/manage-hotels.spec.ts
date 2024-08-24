import { test, expect } from '@playwright/test';
import path from 'path';
const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
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

    // Expect taost popup
    await expect(page.getByText("Signed In!")).toBeVisible()
})

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
        .locator('[name="description"]')
        .fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);


    await expect(page.getByText("Dublin Getaways")).toBeVisible()
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible()
    await expect(page.getByText("Dublin, Ireland")).toBeVisible()
    await expect(page.getByText("All Inclusive")).toBeVisible()
    await expect(page.getByText("$119 per night")).toBeVisible()
    await expect(page.getByText("$2 adults, 3 children")).toBeVisible()
    await expect(page.getByText("2 star rating")).toBeVisible()

    await expect(page.getByRole("link", { name: "Add Hotels" })).toBeVisible()

    // Grabs the first btn
    await expect(
        page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
})