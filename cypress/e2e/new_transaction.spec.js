import {selectors, dataForSignUp, dataForLoginTransaction, dataForLoginReceiver} from "../selectors/selectors";
import {dataForCreateBank} from "../support/commands";

describe('tests for transaction', () => {

    beforeEach("signin", () => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET', '/notifications').as('notifications')
        cy.intercept('GET', '/users').as('users')
        cy.intercept('POST', '/transactions').as('transactions')
        cy.intercept('GET', '/checkAuth').as('checkAuth')
    })

    it('navigates to the new transaction form, selects a user and submits a transaction payment', () => {
        cy.get(selectors.username).type(dataForLoginTransaction.CreatedAccount)
        cy.get(selectors.password).type(dataForLoginTransaction.CreatedPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.btnCreateNewTransaction).click()
        cy.wait('@users')
        cy.get(selectors.transaction_list).should("be.visible").contains('Arely Kertzmann').click({force: true});
        cy.get(selectors.amountField).type(sumForPay)
        cy.get(selectors.addANoteField).type(messageP)
        cy.get(selectors.payBtn).click()
        cy.wait('@transactions')
        cy.get(selectors.returnToTransactionsBtn).click()
        cy.wait('@checkAuth')
        cy.get(selectors.messageTransactionSubmitted).should('be.visible').should('have.text', 'Transaction Submitted!')
        cy.url().should('include', '/')
    })

    it('navigates to the new transaction form, selects a user and submits a transaction request', () => {
        cy.get(selectors.username).type(dataForLoginTransaction.CreatedAccount)
        cy.get(selectors.password).type(dataForLoginTransaction.CreatedPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.btnCreateNewTransaction).click()
        cy.wait('@users')
        cy.get(selectors.transaction_list).should("be.visible").contains('Arely Kertzmann').click({force: true});
        cy.get(selectors.amountField).type(sumForRequest)
        cy.get(selectors.addANoteField).type(messageR)
        cy.get(selectors.requestBtn).click()
        cy.wait('@transactions')
        cy.get(selectors.returnToTransactionsBtn).click()
        cy.wait('@checkAuth')
        cy.get(selectors.messageTransactionSubmitted).should('be.visible').should('have.text', 'Transaction Submitted!')
        cy.url().should('include', '/');
    })

    it('displays new transaction errors', () => {
        cy.get(selectors.username).type(dataForLoginTransaction.CreatedAccount)
        cy.get(selectors.password).type(dataForLoginTransaction.CreatedPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.btnCreateNewTransaction).click()
        cy.wait('@users')
        cy.get(selectors.transaction_list).should("be.visible").contains('Arely Kertzmann').click({force: true});
        cy.get(selectors.amountField).blur().click()
        cy.get(selectors.messagePleaseEnteraValidAmount).should('be.visible').should('have.text', 'Please enter a valid amount')
        cy.get(selectors.addANoteField).click().blur()
        cy.get(selectors.messagePleaseEnteraNote).should('be.visible').should('have.text', 'Please enter a note')
    })

    it('submits a transaction payment and verifies the deposit for the receiver', () => {
        cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
        cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.textYourTransactionPayment).should("contain.text", 'Your transaction payment').should("contain.text", '-$300.00')
        cy.url().should('include', '/');
    })

    it('submits a transaction request and accepts the request for the receiver', () => {
        cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
        cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.textYourTransactionRequest).should("contain.text", 'Your transaction request').should("contain.text", '+$500.00')
        cy.url().should('include', '/');
    })


    it.only('searches for a user by attribute', () => {
        cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
        cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(selectors.btnCreateNewTransaction).should("be.visible").click()
        cy.get(selectors.searchField).type("277-189-3402")
        cy.get(selectors.fieldWithAttribute).should("contain", "277-189-3402")
        cy.wait(1000)
        cy.get(selectors.searchField).clear()
        cy.get(selectors.searchField).type("Pearl56@gmail.com")
        cy.get(selectors.fieldWithAttribute).should("contain", "Pearl56@gmail.com")
        cy.wait(1000)
        cy.get(selectors.searchField).clear()
        cy.url().should('include', '/');
    })

    let sumForPay = 300;
    let sumForRequest = 500;
    let messageP = 'Your transaction payment';
    let messageR = 'Your transaction request';

})