import {selectors, dataForSignUp } from "../selectors/selectors";
import {dataForCreateBank, dataForLoginTransaction, dataForLoginReceiver} from "../support/commands";

describe('UI tests for transaction', () => {

    before("signin", () => {
        cy.visit('/')
    });

    it('custom command login user for submits a transaction payment and request', () => {
        cy.dataForLoginTransaction()
    })

    it ('create new transaction', () => {
        cy.get(selectors.btnCreateNewTransaction)
            .click()
    })


    it('select user for transaction', () => {
        cy.get(selectors.transaction_list)
            .should("be.visible")
            .contains('Arely Kertzmann')
            .click({ force: true });
    })

    // it('displays new transaction errors', () => {
    //     cy.get(selectors.amountField)
    //         .blur()
    //         .click()
    //     cy.get(selectors.messagePleaseEnteraValidAmount)
    //         .should('be.visible')
    //         .should('have.text', 'Please enter a valid amount')
    //
    //     cy.get(selectors.addANoteField)
    //         .click()
    //         .blur()
    //     cy.get(selectors.messagePleaseEnteraNote)
    //         .should('be.visible')
    //         .should('have.text', 'Please enter a note')
    // })



    it ('create transaction pay', () => {
        cy.get(selectors.amountField).type('2')
        cy.get(selectors.addANoteField).type('Your money')
        cy.get(selectors.payBtn).click()
        cy.get(selectors.returnToTransactionsBtn).click()
    })


    it('custom command for logout from an account', () => {
        cy.logoutFromAccount()
    })

    it('custom command login user for submits a transaction payment and request', () => {
        cy.dataForLoginTransaction()
    })


    it ('create new transaction', () => {
        cy.get(selectors.homeBtn)
            .click()
        cy.get(selectors.btnCreateNewTransaction)
            .click()
    })

    it('select user for request', () => {
        cy.get(selectors.transaction_list)
            .should("be.visible")
            .contains('Arely Kertzmann')
            .click({ force: true })
    })

    it ('create transaction payment', () => {
        cy.get(selectors.amountField).type(5 )
        cy.get(selectors.addANoteField).type('Where is the Money Lebowski?')
        cy.get(selectors.requestBtn).click()
    })


    it('custom command for logout from an account', () => {
        cy.logoutFromAccount()
    })


    it('login for receiver', () => {
        cy.dataForLoginReceiver()
    })

    
})