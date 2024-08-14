const login = require("../locators/loginPage-elements.json")
const loginSelectors = login.loginLocators;

class loginPage {
    loginWithUserCredentials(userName, password) {
        cy.get(loginSelectors.username).type(userName);
        cy.get(loginSelectors.password).type(password);
        cy.get(loginSelectors.loginButton).click();
    }
}
export default new loginPage();
