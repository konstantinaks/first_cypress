import {selectors, dataForSignUp, dataForSingUpAndDeleteBankAccount, complete_onboarding} from "../selectors/selectors";

describe('tests for sign up, sign in, logout', () => {

    beforeEach('signup_signin_logout', () => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login')
        cy.intercept('POST', '/users').as('signup_submit')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET', '/notifications').as('notifications')
    })

    it('should display bank account form errors', () => {
        cy.dataDisplayBankAccountFormErrors()
    })

    it('creates a new bank account', () => {
        cy.complete_onboarding()
    })


    it('user should be able to delete a bank account', () => {
        cy.deleteBankAccount()
    })

})