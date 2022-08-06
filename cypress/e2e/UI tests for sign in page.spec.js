import {selectors, dataForSignUp, dataForCreateBank} from "../selectors/selectors";


describe('UI tests for sign in page', () => {

    before('visiting sign in page', () => {
        cy.visit('/')
    })

    it('should show "Real World App logo"', () => {
        cy.get(selectors.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    })

    it('should show "Sign in" title', () => {
        cy.get(selectors.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    it('should show typeable Username field', () => {
        cy.get(selectors.fieldUsername).should('be.visible')
    })

    it('should show typeable Password field', () => {
        cy.get(selectors.fieldPassword).should('be.visible')
    })

    it('should show Username and Password placeholders', () => {
        cy.get(selectors.placeholderPassword).should('be.visible')
        cy.get(selectors.placeholderUsername).should('be.visible')
    })

    it('should show Username is required error if user clicks on it and then click outside this field and didn`t enter any value', () => {
        cy.get(selectors.outside).click()
    })

    it('check "Remember me" checkbox', () => {
        cy.get(selectors.checkboxOn).check().should('be.checked')
        cy.get(selectors.checkboxOff).uncheck().should('not.to.be.checked')
    })

    it('should show enabled by default sign in buton ', () => {
        cy.get(selectors.sinnInDisabled).should('be.disabled')
    })

    it('should have \'Don\'t have an account? Sign Up\' clickable link under \'Sign in\' btn', () => {
        cy.get(selectors.haveDontHaveAnAccountSignUp).should('be.visible')
    })

    it ('should show Cypress copyright link that leads to \'https://www.cypress.io/\'', () => {
        cy.get(selectors.copyright).should('have.attr', 'href', 'https://cypress.io').click()
    })

})