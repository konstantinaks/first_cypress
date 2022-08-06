import {selectors, dataForSignUp} from "../selectors/selectors";
import {dataForCreateBank} from "../support/commands";

describe('UI tests for sign in page', () => {

    before('visiting sign in page', () => {
        cy.visit('/')
    })

    it('custom command for user sign-up', () => {
        cy.dataForSignUp()
    })

    it('custom command for user login', () => {
        cy.dataForLogin()
    })

    it('custom command for create bank account', () => {
        cy.dataForCreateBank()
    })

    it('user should be able to delete a bank account', () => {
        cy.deleteBankAccount()
    })


})