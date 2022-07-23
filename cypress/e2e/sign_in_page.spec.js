import {sign_in_page} from "../selectors/sign_in_page";

describe('UI tests for sign in page', () => {

    before('visiting sign in page', () => {
        cy.visit('/')
    })

    it('should show "Real World App logo"', () => {
        cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    })

    it('should show "Sign in" title', () => {
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    it ('should show typeable Username field', () => {
        cy.get (sign_in_page.fieldUsername).should('be.visible')
    })

    it ('should show typeable Password field', () => {
        cy.get (sign_in_page.fieldPassword).should('be.visible')
    })

    it('should show Password placeholders', () => {
        cy.get (sign_in_page.placeholderPassword).should('be.visible')
    })

    it('should show Username placeholders', () => {
        cy.get (sign_in_page.placeholderUsername).should('be.visible')
    })

    it ('should show \'Username is required\' error if user clicks on it and then click outside this field and didn\'t enter any value', () => {
        cy.get(sign_in_page.outside).click()
    })

    it('checkboxOn', () => {
        cy.get(sign_in_page.checkboxOn).check().should('be.checked')
    })

    it('checkboxOff', () => {
        cy.get(sign_in_page.checkboxOff).uncheck().should('not.to.be.checked')
    })

    it('sinnInDisabled', () => {
        cy.get(sign_in_page.sinnInDisabled).should('be.disabled')
    })

    it ('should have Don/t have an account? Sign Up', () => {
        cy.get (sign_in_page.have_Dont_have_an_account_Sign_Up).should('be.visible')
    })

    it ('haveText_Dont have an account? Sign Up', () => {
        cy.get(sign_in_page.haveText).contains('Don\'t have an account? Sign Up')
    })


    it ('clickLink', () => {
        cy.get(sign_in_page.click_Link).click()
        cy.go('back');
    })

    it ('have Built by Text', () => {
        cy.get(sign_in_page.licenseText).contains('Built by')
    })

    it ('clickCopyrightLink', () => {
        cy.get(sign_in_page.copyright).should('have.attr', 'href', 'https://cypress.io').click()
        cy.get(sign_in_page.copyrightCheckget)
    })





})