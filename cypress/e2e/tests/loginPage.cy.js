import loginPage from "../actions/loginPage-actions.cy.js";
const login = require("../locators/loginPage-elements.json")
const loginSelectors = login.loginLocators;

describe('Tests related to Login Page', () => {

    beforeEach('Set up', () => {
        cy.visit(Cypress.config().baseUrl);
    });

    it('Login with incorrect user credentials', () => {
        cy.fixture("testData.json").then((details) => {
            loginPage.loginWithUserCredentials(details.standard_user, details.incorrect_password)
        });
        cy.get(loginSelectors.loginError).should('have.text', "Epic sadface: Username and password do not match any user in this service");
    });

    it('Error message when login with locked_out_user', () => {
        cy.fixture("testData.json").then((details) => {
            loginPage.loginWithUserCredentials(details.locked_out_user, details.password)
        });
        cy.get(loginSelectors.loginError).should('have.text', "Epic sadface: Sorry, this user has been locked out.");
    });

    it('Login as standard_user', () => {
        cy.fixture("testData.json").then((details) => {
            loginPage.loginWithUserCredentials(details.standard_user, details.password)
        });
        cy.contains('Products').should('be.visible');
        cy.get(loginSelectors.menu).click();
        cy.contains('Logout');
    });

    it('Login as problem_user', () => {
        cy.fixture("testData.json").then((details) => {
            loginPage.loginWithUserCredentials(details.problem_user, details.password)
        });
        cy.get(loginSelectors.menu).click();
        cy.contains('Logout');
    });

    it('Login as performance_glitch_user, by giving extra waiting time', () => {
        cy.fixture("testData.json").then((details) => {
            loginPage.loginWithUserCredentials(details.performance_glitch_user, details.password)
        });
        cy.get(loginSelectors.menu, { timeout: 60000 }).should('be.visible').click();
        cy.contains('Logout');
    });
});
