import { expect, test } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'

test.describe('Login tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.logIn()

    expect(page.url()).toContain('Benefits')
  })

  test('Wrong username', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.logIn('wrongUsername')

    await expect(loginPage.locators.loginFailureText).toBeVisible()
  })

  test('Wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.logIn(undefined, 'wrongPassword')

    await expect(loginPage.locators.loginFailureText).toBeVisible()
  })
})