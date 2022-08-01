import {
    dataDisplayBankAccountFormErrors,
    dataForCreateBank, dataForLoginReceiver, dataForLoginTransaction,
    dataForSignUp,
    sign_in_page
} from "../selectors/sign_in_page";

Cypress.Commands.add('dataForSignUp', () => {
    cy.visit("/signup")
    cy.get(sign_in_page.first_Name).type(dataForSignUp.FirstName)
    cy.get(sign_in_page.last_Name).type(dataForSignUp.LastName)
    cy.get(sign_in_page.username).type(dataForSignUp.Username)
    cy.get(sign_in_page.password).type(dataForSignUp.Password)
    cy.get(sign_in_page.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(sign_in_page.Signup_Submit).click()
})

Cypress.Commands.add('dataForLogin', () => {

    cy.get(sign_in_page.username).type(dataForSignUp.Username)
    cy.get(sign_in_page.password).type(dataForSignUp.Password)
    cy.get(sign_in_page.sign_in).click()
})

Cypress.Commands.add('dataDisplayBankAccountFormErrors', () => {

    cy.get(sign_in_page.clickNext).click()
    cy.get(sign_in_page.bankName).click().blur()
    cy.get(sign_in_page.messageEnterABankName).should('be.visible').should('have.text', 'Enter a bank name')
    cy.get(sign_in_page.bankName).type('1')
    cy.get(sign_in_page.messageEnterABankName).should('be.visible').should('have.text', 'Must contain at least 5 characters')
    cy.get(sign_in_page.bankName).clear()
    cy.get(sign_in_page.routing_number).click().blur()
    cy.get(sign_in_page.messageEnterAValidBankRoutingNumber).should('be.visible').should('have.text', 'Enter a valid bank routing number')
    cy.get(sign_in_page.routing_number).type('w')
    cy.get(sign_in_page.messageEnterAValidBankRoutingNumber).should('be.visible').should('have.text', 'Must contain a valid routing number')
    cy.get(sign_in_page.routing_number).clear()
    cy.get(sign_in_page.account_number).click().blur()
    cy.get(sign_in_page.messageEnterAValidBankAccountNumber).should('be.visible').should('have.text', 'Enter a valid bank account number')
    cy.get(sign_in_page.account_number).type('h')
    cy.get(sign_in_page.messageEnterAValidBankAccountNumber).should('be.visible').should('have.text', 'Must contain at least 9 digits')
    cy.get(sign_in_page.account_number).clear()
})


Cypress.Commands.add('dataForCreateBank', () => {
    cy.get(sign_in_page.clickNext).click()
    cy.get(sign_in_page.bankName).type(dataForCreateBank.BankName)
    cy.get(sign_in_page.routing_number).type(dataForCreateBank.RoutingNumber)
    cy.get(sign_in_page.account_number).type(dataForCreateBank.AccountNumber)
    cy.get(sign_in_page.click_save_bank).click()
    cy.get(sign_in_page.click_done).click()
    cy.get(sign_in_page.btnBankAccounts).click()
})

Cypress.Commands.add('deleteBankAccount', () => {

    cy.get(sign_in_page.btnBankAccounts).click()
    cy.get(sign_in_page.btnDeleteBankAccounts).click()
})

Cypress.Commands.add('logoutFromAccount', () => {

    cy.get(sign_in_page.logout_btn).click()
})


Cypress.Commands.add('dataForLoginTransaction', () => {
    cy.get(sign_in_page.username).type(dataForLoginTransaction.CreatedAccount)
    cy.get(sign_in_page.password).type(dataForLoginTransaction.CreatedPassword)
    cy.get(sign_in_page.sign_in).click()
})

Cypress.Commands.add ('dataForLoginReceiver', () => {
    cy.get(sign_in_page.username).type(dataForLoginReceiver.ReceiverUsername)
    cy.get(sign_in_page.password).type(dataForLoginReceiver.ReceiverPassword)
    cy.get(sign_in_page.sign_in).click()
})






