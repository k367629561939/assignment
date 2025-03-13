import { BasePage } from "./basePage";
import { apiPath, tableColumns } from "../helpers/constants";

export class BenefitsPage extends BasePage {
    path = "/Prod/Benefits"
    locators = {
        addEmployeeButton: this.page.locator('button#add'),
        employeeModal: this.page.locator('div#employeeModal'),
        modal: {
            firstNameInput: () => this.locators.employeeModal.locator('input#firstName'),
            lastNameInput: () => this.locators.employeeModal.locator('input#lastName'),
            dependantsInput: () => this.locators.employeeModal.locator('input#dependants'),
            addEmployeeButton: () => this.locators.employeeModal.locator('button#addEmployee'),
            updateEmployeeButton: () => this.locators.employeeModal.locator('button#updateEmployee')
        },
        employeeTable: this.page.locator('table#employeesTable'),
        employeeRow: (id: string) => this.locators.employeeTable.locator('tr').filter({ hasText: id }),
        deleteModal: this.page.locator('div#deleteModal'),
        deleteEmployeeButton: () => this.locators.deleteModal.locator('button#deleteEmployee')
    }

    async goto() {
        await this.page.goto(this.path)
    }

    async addEmployee(first: string, last: string, dependants: number) {
        await this.locators.addEmployeeButton.click()
        await this.locators.modal.firstNameInput().fill(first)
        await this.locators.modal.lastNameInput().fill(last)
        await this.locators.modal.dependantsInput().fill(dependants.toString())
        const responsePromise = this.page.waitForResponse((res) => res.url().includes(apiPath) && res.request().method() === 'POST')
        await this.locators.modal.addEmployeeButton().click()
        const response = await responsePromise
        const jsonData = await response.json()
        const id = jsonData.id
        return id
    }

    async getEmployeeId(first: string, last: string) {
        const idValue = await this.page.evaluate(({ first, last, tableColumns }) => {
            const rows = document.querySelectorAll('table tr');
            for (const row of rows) {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 3 && cells[tableColumns["First Name"]].innerText.trim() === first && cells[tableColumns["Last Name"]].innerText.trim() === last) {
                    return cells[tableColumns.Id].innerText.trim();
                }
            }
            return null;
        }, { first, last, tableColumns });
        if (!idValue) {
            throw new Error(`Employee ${first} ${last} not found in the table`)
        }
        return idValue
    }

    async editEmployee(id: string, first: string = 'PW_Test_Edit', last: string = 'PW_Test_Edit', dependants: number = 0) {
        const row = this.locators.employeeRow(id)
        await row.locator('i').first().click()
        await this.locators.modal.firstNameInput().fill(first)
        await this.locators.modal.lastNameInput().fill(last)
        await this.locators.modal.dependantsInput().fill(dependants.toString())
        await this.locators.modal.updateEmployeeButton().click()
    }

    async deleteEmployee(id: string) {
        const row = this.locators.employeeRow(id)
        await row.locator('i').last().click()
        await this.locators.deleteEmployeeButton().click()
    }
}