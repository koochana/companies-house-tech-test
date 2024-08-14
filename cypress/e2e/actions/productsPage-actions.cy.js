const product = require('../locators/productsPage-elements.json');
const productLocatorss = product.productLocators;

class productPage {

    orderItem(option) {
        switch (option) {
            case "Sauce Labs Bike Light":
                cy.contains("Sauce Labs Bike Light").click();
                break;
            case "Test.allTheThings() T-Shirt (Red)":
                cy.contains("Test.allTheThings() T-Shirt (Red)").click();
                break;
            case "Sauce Labs Onesie":
                cy.contains("Sauce Labs Onesie").click();
                break;
            case "Sauce Labs Fleece Jacket":
                cy.contains("Sauce Labs Fleece Jacket").click();
                break;
            case "Sauce Labs Bolt T-Shirt":
                cy.contains("Sauce Labs Bolt T-Shirt").click();
                break;
            case "Sauce Labs Backpack":
                cy.contains("Sauce Labs Backpack").click();
                break;
        }
    }

    checkout() {
        cy.get(productLocatorss.shoppingCart).click();
        cy.get(productLocatorss.checkout).click();
    }

    completeCheckoutDetails() {
        cy.get(productLocatorss.firstName).type("test");
        cy.get(productLocatorss.lastName).type("automation");
        cy.get(productLocatorss.postalCode).type("AB1 4CD");
        cy.get(productLocatorss.submit).click();
    }

    completeThePurchase() {
        cy.get(productLocatorss.finishButton).click();
    }

    cancelCheckout() {
        cy.get(productLocatorss.cancelButton).click();
    }

    continueShopping() {
        cy.get(productLocatorss.continueShoppingButton).click();
    }
}
export default new productPage();
