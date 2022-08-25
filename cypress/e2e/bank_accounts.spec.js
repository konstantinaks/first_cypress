import {credentialsApi} from "../support/loginHelper";

describe('tests for sign up, sign in, logout', () => {

    beforeEach('signup_signin_logout', () => {
        cy.visit('/')
        let username =  credentialsApi()
        cy.signupApi(username, "1234567890")
        cy.loginByApi(username, "1234567890")
        cy.intercept('POST', '/login').as('login')
        cy.intercept('POST', '/users').as('signupSubmit')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET', '/notifications').as('notifications')
    })

    it('should display bank account form errors', () => {
        cy.dataDisplayBankAccountFormErrors()
        cy.logoutApi()
    })

    it('creates a new bank account', () => {
        cy.complete_onboarding()
        cy.logoutApi()
    })

    it('user should be able to delete a bank account', () => {
        cy.deleteBankAccount()
        cy.logoutApi()
    })
})

