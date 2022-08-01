import {sign_in_page, dataForSignUp} from "../selectors/sign_in_page";
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

    it('deleteBankAccount', () => {
        cy.deleteBankAccount()
    })


})