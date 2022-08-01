import {sign_in_page, dataForSignUp } from "../selectors/sign_in_page";
import {dataForCreateBank, dataForLoginTransaction, dataForLoginReceiver} from "../support/commands";

describe('UI tests for transaction', () => {

    before("signin", () => {
        cy.visit('/')
    });

    it('custom command login user for submits a transaction payment and request', () => {
        cy.dataForLoginTransaction()
    })

    it ('create new transaction', () => {
        cy.get(sign_in_page.btnCreateNewTransaction)
            .click()
    })


    it('select user for transaction', () => {
        cy.get(sign_in_page.transaction_list)
            .should("be.visible")
            .contains('Arely Kertzmann')
            .click({ force: true });
    })

    // it('displays new transaction errors', () => {
    //     cy.get(sign_in_page.amountField)
    //         .blur()
    //         .click()
    //     cy.get(sign_in_page.messagePleaseEnteraValidAmount)
    //         .should('be.visible')
    //         .should('have.text', 'Please enter a valid amount')
    //
    //     cy.get(sign_in_page.addANoteField)
    //         .click()
    //         .blur()
    //     cy.get(sign_in_page.messagePleaseEnteraNote)
    //         .should('be.visible')
    //         .should('have.text', 'Please enter a note')
    // })



    it ('create transaction pay', () => {
        cy.get(sign_in_page.amountField).type('2')
        cy.get(sign_in_page.addANoteField).type('Your money')
        cy.get(sign_in_page.payBtn).click()
        cy.get(sign_in_page.returnToTransactionsBtn).click()
    })


    it('custom command for logout from an account', () => {
        cy.logoutFromAccount()
    })

    it('custom command login user for submits a transaction payment and request', () => {
        cy.dataForLoginTransaction()
    })


    it ('create new transaction', () => {
        cy.get(sign_in_page.homeBtn)
            .click()
        cy.get(sign_in_page.btnCreateNewTransaction)
            .click()
    })

    it('select user for request', () => {
        cy.get(sign_in_page.transaction_list)
            .should("be.visible")
            .contains('Arely Kertzmann')
            .click({ force: true })
    })

    it ('create transaction payment', () => {
        cy.get(sign_in_page.amountField).type(5 )
        cy.get(sign_in_page.addANoteField).type('Where is the Money Lebowski?')
        cy.get(sign_in_page.requestBtn).click()
    })


    it('custom command for logout from an account', () => {
        cy.logoutFromAccount()
    })


    it('login for receiver', () => {
        cy.dataForLoginReceiver()
    })

    
})