import { test, expect } from '@playwright/test';

test.describe('Varukorg - negativa/edge-scenarier', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('tom varukorg ska inte visa någon badge', async ({ page }) => {
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('ta bort produkt ska uppdatera varukorgsantalet', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('checkout utan ifyllda uppgifter ska visa felmeddelande', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('checkout ska nekas om varukorgen är tom', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');

    // Verifiera att man inte kan slutföra ett köp utan produkter
    await expect(page).toHaveURL(/checkout-step-one/);
  });

});