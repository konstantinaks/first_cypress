import {selectors, dataForSignUp, complete_onboarding} from "../selectors/selectors";

describe('tests for sign up, sign in, logout', () => {

    beforeEach('signup_signin_logout', () => {
        cy.visit('/')
        cy.intercept('POST','/login').as('login')
        cy.intercept('POST', '/users').as('signup_submit')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET','/notifications').as('notifications')
    })

    it('should display login errors', () => {
        cy.get(selectors.fieldUsername).type('qwerty')
        cy.get(selectors.fieldPassword).type('passwordtext')
        cy.get(selectors.sign_in).click()
        cy.get(selectors.usernameOrPasswordIsInvalid).should('be.visible').should('have.text', 'Username or password is invalid')
        cy.get(selectors.fieldUsername).type('NormalLogin')
        cy.get(selectors.fieldPassword).type('12').blur()
        cy.get(selectors.messagePasswordMustContainAtLeast4Characters).should('be.visible').should('have.text', 'Password must contain at least 4 characters')

    })

    it('should display signup errors' , () => {
        cy.get(selectors.click_Link).click()
        cy.get(selectors.first_Name).click().blur()
        cy.get(selectors.messageFirstNameIsRequired).should('be.visible').should('have.text', 'First Name is required')
        cy.get(selectors.last_Name).click().blur()
        cy.get(selectors.messageLastNameIsRequired).should('be.visible').should('have.text', 'Last Name is required')
        cy.get(selectors.username).click().blur()
        cy.get(selectors.messageUsernameIsRequired).should('be.visible').should('have.text', 'Username is required')
        cy.get(selectors.password).click().blur()
        cy.get(selectors.messageEnterYourPassword).should('be.visible').should('have.text', 'Enter your password')
        cy.get(selectors.password).type('0').blur()
        cy.get(selectors.messagePasswordMustContainAtLeast4Characters).should('be.visible').should('have.text', 'Password must contain at least 4 characters')
        cy.get(selectors.password).clear()
        cy.get(selectors.ConfirmPassword).click().blur()
        cy.get(selectors.messageConfirmYourPassword).should('be.visible').should('have.text', 'Confirm your password')
        cy.get(selectors.password).type('12345')
        cy.get(selectors.ConfirmPassword).type('1234')
        cy.get(selectors.messagePasswordDoesNotMatch).should('be.visible').should('have.text', 'Password does not match')
    })

    it('should error for an invalid user', () => {
        cy.get(selectors.fieldUsername).type('non-existent user')
        cy.get(selectors.fieldPassword).type('non-existent user')
        cy.get(selectors.sign_in).click()
        cy.get(selectors.messageUsernameOrPasswordIsInvalid).should('be.visible').should('have.text', 'Username or password is invalid')
        cy.wait('@login')
    })

    it('should error for an invalid password for existing user', () => {
        cy.get(selectors.haveDontHaveAnAccountSignUp).click()
        cy.get(selectors.first_Name).type(dataForSignUp.FirstName)
        cy.get(selectors.last_Name).type(dataForSignUp.LastName)
        cy.get(selectors.username).type(dataForSignUp.Username)
        cy.get(selectors.password).type(dataForSignUp.Password)
        cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
        cy.get(selectors.Signup_Submit).click()
        cy.wait('@signup_submit')
        cy.get(selectors.fieldUsername).type(dataForSignUp.Username)
        cy.get(selectors.fieldPassword).type(dataForSignUp.ErrorPassword)
        cy.get(selectors.sign_in).click()
        cy.get(selectors.messageUsernameOrPasswordIsInvalid).should('be.visible').should('have.text', 'Username or password is invalid')
        cy.wait('@login').its('response.statusCode').should('eq', 401);
    })



})


