import { test, expect } from '@playwright/test'
import { BenefitsPage } from '../../pages/benefitsPage'
import { LoginPage } from '../../pages/loginPage'
import { addEmployee, deleteEmployee } from '../../endpoints/api'

test.describe('Benefits tests', () => {
    test.beforeEach('Login and open benefits page', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.logIn()

        await page.waitForLoadState('networkidle')
    })

    test('Open modal', async ({ page }) => {
        const benefitsPage = new BenefitsPage(page)
        await benefitsPage.locators.addEmployeeButton.click()
        await expect(benefitsPage.locators.employeeModal).toBeVisible()
    })

    test.describe('Employee actions', () => {
        var id: string
        test.afterEach('Delete test user', async ({ request }) => {
            await deleteEmployee(request, id)
        })

        test('Add employee', async ({ page }) => {
            const benefitsPage = new BenefitsPage(page)
            const name = `PW_Test_${Date.now()}`
            id = await benefitsPage.addEmployee(name, name, 0)
            await expect(benefitsPage.locators.employeeModal).not.toBeVisible()
            await expect(benefitsPage.locators.employeeTable.getByText(id)).toBeVisible()
        })

        test('Add invalid employee', async ({ page }) => {
            const benefitsPage = new BenefitsPage(page)
            const name = '0123456789'.repeat(10)
            await benefitsPage.addEmployee(name, name, 50)
            await expect(benefitsPage.locators.employeeModal).toBeVisible()
            await expect(benefitsPage.locators.employeeModal).toContainText('First name must be less than 50 characters')
        })

        test.describe('Existing employee actions', () => {
            test.beforeEach('Create test user', async ({ page, request }) => {
                const response = await addEmployee(request, { firstName: 'PW_Test', lastName: 'PW_Test', dependants: 0 })
                const jsonData = await response.json()
                id = jsonData.id

                const benefitsPage = new BenefitsPage(page)
                await benefitsPage.goto()
            })

            test('Edit employee', async ({ page }) => {
                const testName = `PW_Test_Edit_${Date.now()}`
                const benefitsPage = new BenefitsPage(page)
                await benefitsPage.editEmployee(id, testName, testName)
                await expect(benefitsPage.locators.employeeTable.getByText(testName)).toHaveCount(2)
                await expect(benefitsPage.locators.employeeRow(id)).toContainText(testName)
            })

            test('Delete employee', async ({ page }) => {
                const benefitsPage = new BenefitsPage(page)
                await benefitsPage.deleteEmployee(id)
                await expect(benefitsPage.locators.employeeTable).not.toHaveText(id)
            })
        })
    })
})