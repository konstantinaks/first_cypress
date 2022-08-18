import {selectors, dataForSignUp, dataForCreateBank} from "../selectors/selectors";

describe('UI tests for sign in page', () => {

    beforeEach('signup_signin_logout', () => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login')
        cy.intercept('POST', '/users').as('signupSubmit')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET', '/notifications').as('notifications')
        cy.intercept('POST', '/logout').as('logout')
    })

    const BankName = "NormBank"
    const RoutingNum = "NameBank1"
    const AccountNum = "123456789"

    it('should allow a visitor to sign-up', () => {
        cy.get(selectors.haveDontHaveAnAccountSignUp).click()
        cy.get(selectors.firstName).type(dataForSignUp.FirstName);
        cy.get(selectors.lastName).type(dataForSignUp.LastName);
        cy.get(selectors.username).type(dataForSignUp.Username);
        cy.get(selectors.password).type(dataForSignUp.Password);
        cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password);
        cy.get(selectors.SignupSubmit).click();
        cy.wait('@signup_submit')
    })

    it('should allow a visitor to login', () => {
        cy.get(selectors.haveDontHaveAnAccountSignUp).click()
        cy.get(selectors.firstName).type(dataForSignUp.FirstName)
        cy.get(selectors.lastName).type(dataForSignUp.LastName)
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
        cy.get(selectors.SignupSubmit).click()
        cy.wait('@signup_submit')
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.signIn).click()
        cy.get(selectors.modal).should('be.visible')
        cy.get(selectors.clickNext).click()
    })

    it('Create Bank Account', () => {
        cy.get(selectors.haveDontHaveAnAccountSignUp).click()
        cy.get(selectors.firstName).type(dataForSignUp.FirstName)
        cy.get(selectors.lastName).type(dataForSignUp.LastName)
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
        cy.get(selectors.SignupSubmit).click()
        cy.wait('@signup_submit')
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.signIn).click()
        cy.get(selectors.modal).should('be.visible')
        cy.get(selectors.clickNext).click()
        cy.get(selectors.bankName).type(BankName)
        cy.get(selectors.routingNumber).type(RoutingNum)
        cy.get(selectors.accountNumber).type(AccountNum)
        cy.get(selectors.clickSaveBank).click()
        cy.wait('@graphql')
        cy.get(selectors.clickDone).click()
        cy.url().should('include', '/');
    })


    it('should allow a visitor to logout', () => {
        cy.get(selectors.haveDontHaveAnAccountSignUp).click()
        cy.get(selectors.firstName).type(dataForSignUp.FirstName)
        cy.get(selectors.lastName).type(dataForSignUp.LastName)
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
        cy.get(selectors.SignupSubmit).click()
        cy.wait('@signup_submit')
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.signIn).click()
        cy.get(selectors.logoutBtn).click()
        cy.wait('@logout')
    })

    it('custom command for user sign-up', () => {
        cy.dataForSignUp()
    })

    it('custom command for user login', () => {
        cy.dataForLogin()
    })

    it('custom command for logout from an account', () => {
        cy.logoutFromAccount()
    })

})