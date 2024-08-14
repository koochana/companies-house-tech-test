import loginPage from "../actions/loginPage-actions.cy.js";
import productPage from "../actions/productsPage-actions.cy.js";
const login = require("../locators/loginPage-elements.json")
const loginSelectors = login.loginLocators;
const product = require("../locators/productsPage-elements.json")
const productSelectors = product.productLocators;

describe('Scenarios related to Products page, Purchase page and Checkout page', () => {

    const productsList = ["Sauce Labs Bolt T-Shirt",
        "Sauce Labs Bike Light",
        "Sauce Labs Onesie",
        "Sauce Labs Fleece Jacket",
        "Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Backpack"];

    const productsPrice = ["$15.99", "$7.99",  "$49.99", "$29.99", "$9.99", "$15.99"];

    beforeEach('Set-up', () => {
        cy.visit(Cypress.config().baseUrl);
        cy.fixture("testData.json").then((details) => {
            loginPage.loginWithUserCredentials(details.standard_user, details.password)
        });
    });

    it('Complete checkout of an item by purchasing and reviewing', () => {
        productPage.orderItem(productsList[4]);
        cy.get(product.productLocators.addToCart).click()
        productPage.checkout();
        productPage.completeCheckoutDetails();
        cy.contains(productsList[4])
        productPage.completeThePurchase();
        cy.get(product.productLocators.orderConfirmation).invoke('text').then((text) => {
            expect(text).to.contain("THANK YOU FOR YOUR ORDER");
        });
    });

    it('Add few products to the cart, remove a item from the cart and then purchase', () => {
        cy.get(productSelectors.productList).find(productSelectors.productItem).each(($el, index, list) => {
            const productName = $el.find(productSelectors.productName).text()
            if (productName.includes(productsList[4])) {
                cy.wrap($el).find(productSelectors.addToCart).click()
            }
            if (productName.includes(productsList[1])) {
                cy.wrap($el).find(productSelectors.addToCart).click()
            }
            if (productName.includes(productsList[5])) {
                cy.wrap($el).find(productSelectors.addToCart).click()
            }
        });
        cy.get(productSelectors.shoppingCart).click();
        cy.get(productSelectors.cartList).find(productSelectors.cartItem).each(($el, index, list) => {
            const cartItemName = $el.find(productSelectors.cartItemName).text()
            if (cartItemName.includes(productsList[4])) {
                cy.wrap($el).find(productSelectors.removeItem).click()
            }
        });
        productPage.checkout();
        productPage.completeCheckoutDetails();
        cy.contains(productsList[1])
        cy.contains(productsList[5])
        productPage.completeThePurchase();
        cy.get(productSelectors.orderConfirmation).invoke('text').then((text) => {
            expect(text).to.contain("THANK YOU FOR YOUR ORDER");
        });
    });

    it('Verify all the products on the products page', () => {
        cy.contains("Products")
        cy.get(productSelectors.productName).should('have.length', 6);
        cy.get(productSelectors.productName).each((element, index) => {
            expect(productsList).includes(element.text())
        });
    });

    it('Verify prices,texts of all the items on the products page', () => {
        cy.contains(`${productsList[5]}carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.${productsPrice[3]}ADD TO CART`)
        cy.contains(`${productsList[1]}A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.${productsPrice[4]}ADD TO CART`)
        cy.contains(`${productsList[0]}Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.${productsPrice[0]}ADD TO CART`)
        cy.contains(`${productsList[3]}It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.${productsPrice[2]}ADD TO CART`)
        cy.contains(`${productsList[2]}Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.${productsPrice[1]}ADD TO CART`)
        cy.contains(`${productsList[4]}This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.${productsPrice[5]}ADD TO CART`)
    });

});
