import { complete_onboarding, dataDisplayBankAccountFormErrors, dataForLoginReceiver, dataForLoginTransaction, dataForSignUp,
    dataForSingUpAndDeleteBankAccount, selectors,} from "../selectors/selectors";

import {dataForLoginUserB, notifications} from "../selectors/notifications";

Cypress.Commands.add('dataForSignUp', () => {
    cy.visit("/signup")
    cy.get(selectors.firstName).type(dataForSignUp.FirstName)
    cy.get(selectors.lastName).type(dataForSignUp.LastName)
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(selectors.SignupSubmit).click()
})

Cypress.Commands.add('dataForLogin', () => {
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.signIn).click()
})

Cypress.Commands.add('logoutFromAccount', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.firstName).type(dataForSingUpAndDeleteBankAccount.FirstName)
    cy.get(selectors.lastName).type(dataForSingUpAndDeleteBankAccount.LastName)
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.SignupSubmit).click()
    cy.wait('@signup_submit')
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.signIn).click()
    cy.wait('@login')
    cy.wait('@graphql')
    cy.wait('@notifications')
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).type(complete_onboarding.BankName)
    cy.get(selectors.routingNumber).type(complete_onboarding.RoutingNumber)
    cy.get(selectors.accountNumber).type(complete_onboarding.AccountNumber)
    cy.get(selectors.clickSaveBank).click()
    cy.wait('@graphql')
    cy.get(selectors.clickDone).click()
    cy.wait('@graphql')
    cy.get(selectors.logoutBtn).click()
})

Cypress.Commands.add('dataDisplayBankAccountFormErrors', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.firstName).type(dataForSignUp.FirstName)
    cy.get(selectors.lastName).type(dataForSignUp.LastName)
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(selectors.SignupSubmit).click()
    cy.wait('@signupSubmit')
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.signIn).click()
    cy.wait('@login')
    cy.get(selectors.modal).should('be.visible')
    cy.url().should('include', '/');
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).click().blur()
    cy.get(selectors.messageEnterABankName).should('be.visible').should('have.text', 'Enter a bank name')
    cy.get(selectors.bankName).type('1')
    cy.get(selectors.messageEnterABankName).should('be.visible').should('have.text', 'Must contain at least 5 characters')
    cy.get(selectors.bankName).clear()
    cy.get(selectors.routingNumber).click().blur()
    cy.get(selectors.messageEnterAValidBankRoutingNumber).should('be.visible').should('have.text', 'Enter a valid bank routing number')
    cy.get(selectors.routingNumber).type('w')
    cy.get(selectors.messageEnterAValidBankRoutingNumber).should('be.visible').should('have.text', 'Must contain a valid routing number')
    cy.get(selectors.routingNumber).clear()
    cy.get(selectors.accountNumber).click().blur()
    cy.get(selectors.messageEnterAValidBankAccountNumber).should('be.visible').should('have.text', 'Enter a valid bank account number')
    cy.get(selectors.accountNumber).type('h')
    cy.get(selectors.messageEnterAValidBankAccountNumber).should('be.visible').should('have.text', 'Must contain at least 9 digits')
    cy.get(selectors.accountNumber).clear()
    cy.url().should('include', '/');
})

Cypress.Commands.add('complete_onboarding', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.firstName).type(dataForSignUp.FirstName)
    cy.get(selectors.lastName).type(dataForSignUp.LastName)
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(selectors.SignupSubmit).click()
    cy.wait('@signupSubmit')
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.sign_in).click()
    cy.wait('@login')
    cy.wait('@graphql')
    cy.wait('@notifications')
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).type(complete_onboarding.BankName)
    cy.get(selectors.routingNumber).type(complete_onboarding.RoutingNumber)
    cy.get(selectors.accountNumber).type(complete_onboarding.AccountNumber)
    cy.get(selectors.clickSaveBank).click()
    cy.wait('@graphql')
    cy.get(selectors.clickDone).click()
    cy.wait('@graphql')
    cy.get(selectors.btnBankAccounts).click()
    cy.wait('@graphql')
    cy.url().should('include', '/')
})

Cypress.Commands.add('deleteBankAccount', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.firstName).type(dataForSingUpAndDeleteBankAccount.FirstName)
    cy.get(selectors.last_Name).type(dataForSingUpAndDeleteBankAccount.LastName)
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.Signup_Submit).click()
    cy.wait('@signupSubmit')
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.sign_in).click()
    cy.wait('@login')
    cy.wait('@graphql')
    cy.wait('@notifications')
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).type(complete_onboarding.BankName)
    cy.get(selectors.routingNumber).type(complete_onboarding.RoutingNumber)
    cy.get(selectors.accountNumber).type(complete_onboarding.AccountNumber)
    cy.get(selectors.clickSaveBank).click()
    cy.wait('@graphql')
    cy.get(selectors.clickDone).click()
    cy.wait('@graphql')
    cy.get(selectors.btnBankAccounts).click()
    cy.wait('@graphql')
    cy.get(selectors.btnBankAccounts).click()
    cy.get(selectors.btnDeleteBankAccounts).click()
})

Cypress.Commands.add('dataForLoginTransaction', () => {
    cy.get(selectors.username).type(dataForLoginTransaction.CreatedAccount)
    cy.get(selectors.password).type(dataForLoginTransaction.CreatedPassword)
    cy.get(selectors.signIn).click()
})

Cypress.Commands.add ('dataForLoginReceiver', () => {
    cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
    cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
    cy.get(selectors.signIn).click()
})

function generateData1() {
    const names = [
        "Alex",
        "Viktor",
        "Ivan",
        "Ostap",
        "Igor",
        "Michael",
    ];
    const randomNum = Math.floor(Math.random() * 1000);
    const pickedNameIndex = Math.floor(Math.random() * names.length);
    return `${names[pickedNameIndex]}${randomNum}`;
}