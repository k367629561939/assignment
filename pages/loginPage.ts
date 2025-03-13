import { getEnvVar } from "../helpers/envVars";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    path = "/Prod/Account/Login"

    locators = {
        usernameInput: this.page.locator('input[id="Username"]'),
        passwordInput: this.page.locator('input[id="Password"]'),
        loginButton: this.page.locator('button[type="submit"]'),
        loginFailureText: this.page.locator('div.text-danger')
    }

    async logIn(username: string = getEnvVar("USER_NAME"), password: string = getEnvVar("USER_PASS")) {
        await this.locators.usernameInput.fill(username)
        await this.locators.passwordInput.fill(password)
        await this.locators.loginButton.click()
    }
}