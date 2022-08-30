import {selectors, } from "../selectors/selectors";
import {notifications} from "../selectors/notifications";

const firstName = "David";
const lastName = "Beckham";
const email = "Beckham12345@mailinator.com";
const phoneNumber = "9379992";

describe('tests for notification', () => {

    beforeEach("signin", () => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET', '/notifications').as('notifications')
        cy.intercept('POST', '/logout').as('logout')
        cy.intercept('GET', '/checkAuth').as('checkAuth')
    })

    it('Should render the user settings form', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.userSettingsText).and("have.text", "User Settings")
        cy.get(selectors.firstNameField).should("be.visible")
        cy.get(selectors.lastNameField).should("be.visible")
        cy.get(selectors.emailField).should("be.visible")
        cy.get(selectors.phoneNumberField).should("be.visible")
        cy.logoutApi()
        cy.wait('@logout')
    })

    it('Should display user setting form errors', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.firstNameField).clear().blur()
        cy.get(selectors.messageEnteraFirstName).should("have.text", "Enter a first name")
        cy.get(selectors.lastNameField).clear().blur()
        cy.get(selectors.messageEnteraLastName).should("have.text", "Enter a last name")
        cy.get(selectors.emailField).clear().blur()
        cy.get(selectors.messageEnterAnEmailAddress).should("have.text", "Enter an email address")
        cy.get(selectors.emailField).clear().type('www')
        cy.get(selectors.messageMustContainaValidEmailAddress).should("have.text", "Must contain a valid email address")
        cy.get(selectors.phoneNumberField).clear().blur()
        cy.get(selectors.messageEnteraPhoneNumber).should("have.text", "Enter a phone number")
        cy.get(selectors.phoneNumberField).clear().type('1')
        cy.get(selectors.messagePhoneNumberIsNotValid).should("have.text", "Phone number is not valid")
        cy.logoutApi()
        cy.wait('@logout')
    })

    it('User should be able to update all settings in once', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.firstNameField).clear().type(firstName)
        cy.get(selectors.lastNameField).clear().type(lastName)
        cy.get(selectors.emailField).clear().type(email)
        cy.get(selectors.phoneNumberField).clear().type(phoneNumber)
        cy.get(selectors.saveUserSettingsBtn).click()
        cy.wait("@checkAuth")
        cy.logoutApi()
        cy.wait('@logout')
    })

    it('User should be able to update first name', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.firstNameField).clear().type('Abra')
        cy.get(selectors.saveUserSettingsBtn).click()
        cy.wait("@checkAuth")
        cy.logoutApi()
        cy.wait('@logout')
    })

    it('User should be able to update last name', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.lastNameField).clear().type('Kadabra')
        cy.get(selectors.saveUserSettingsBtn).click()
        cy.wait("@checkAuth")
        cy.logoutApi()
        cy.wait('@logout')
    })

    it('User should be able to update email', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.emailField).clear().type('newMail@mailinator.com')
        cy.get(selectors.saveUserSettingsBtn).click()
        cy.wait("@checkAuth")
        cy.logoutApi()
        cy.wait('@logout')
    })

    it('User should be able to update phone number', () => {
        cy.loginByApi("Katharina_Bernier", "s3cret")
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.myAccountBtn).click()
        cy.get(selectors.phoneNumberField).clear().type('9379992')
        cy.get(selectors.saveUserSettingsBtn).click()
        cy.wait("@checkAuth")
        cy.logoutApi()
        cy.wait('@logout')
    })
})