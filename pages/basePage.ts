import { Page } from "@playwright/test"

export class BasePage {
    page: Page
    path = "/"
    locators = {}

    constructor(page: Page) {
        this.page = page
    }

    async goto(): Promise<void> {
        await this.page.goto(this.path)
    }
}