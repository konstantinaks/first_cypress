import {
    complete_onboarding,
    dataDisplayBankAccountFormErrors,
    dataForLoginReceiver,
    dataForLoginTransaction,
    dataForSignUp,
    dataForSingUpAndDeleteBankAccount,
    selectors
} from "../selectors/selectors";

Cypress.Commands.add('dataForSignUp', () => {
    cy.visit("/signup")
    cy.get(selectors.first_Name).type(dataForSignUp.FirstName)
    cy.get(selectors.last_Name).type(dataForSignUp.LastName)
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(selectors.Signup_Submit).click()
})

Cypress.Commands.add('dataForLogin', () => {
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.sign_in).click()
})



Cypress.Commands.add('logoutFromAccount', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.first_Name).type(dataForSingUpAndDeleteBankAccount.FirstName)
    cy.get(selectors.last_Name).type(dataForSingUpAndDeleteBankAccount.LastName)
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.Signup_Submit).click()
    cy.wait('@signup_submit')
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.sign_in).click()
    cy.wait('@login')
    cy.wait('@graphql')
    cy.wait('@notifications')
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).type(complete_onboarding.BankName)
    cy.get(selectors.routing_number).type(complete_onboarding.RoutingNumber)
    cy.get(selectors.account_number).type(complete_onboarding.AccountNumber)
    cy.get(selectors.click_save_bank).click()
    cy.wait('@graphql')
    cy.get(selectors.click_done).click()
    cy.wait('@graphql')
    cy.get(selectors.logout_btn).click()
})

Cypress.Commands.add('dataDisplayBankAccountFormErrors', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.first_Name).type(dataForSignUp.FirstName)
    cy.get(selectors.last_Name).type(dataForSignUp.LastName)
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(selectors.Signup_Submit).click()
    cy.wait('@signup_submit')
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.sign_in).click()
    cy.wait('@login')
    cy.get(selectors.modal).should('be.visible')
    cy.url().should('include', '/');
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).click().blur()
    cy.get(selectors.messageEnterABankName).should('be.visible').should('have.text', 'Enter a bank name')
    cy.get(selectors.bankName).type('1')
    cy.get(selectors.messageEnterABankName).should('be.visible').should('have.text', 'Must contain at least 5 characters')
    cy.get(selectors.bankName).clear()
    cy.get(selectors.routing_number).click().blur()
    cy.get(selectors.messageEnterAValidBankRoutingNumber).should('be.visible').should('have.text', 'Enter a valid bank routing number')
    cy.get(selectors.routing_number).type('w')
    cy.get(selectors.messageEnterAValidBankRoutingNumber).should('be.visible').should('have.text', 'Must contain a valid routing number')
    cy.get(selectors.routing_number).clear()
    cy.get(selectors.account_number).click().blur()
    cy.get(selectors.messageEnterAValidBankAccountNumber).should('be.visible').should('have.text', 'Enter a valid bank account number')
    cy.get(selectors.account_number).type('h')
    cy.get(selectors.messageEnterAValidBankAccountNumber).should('be.visible').should('have.text', 'Must contain at least 9 digits')
    cy.get(selectors.account_number).clear()
    cy.url().should('include', '/');
})


Cypress.Commands.add('complete_onboarding', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.first_Name).type(dataForSignUp.FirstName)
    cy.get(selectors.last_Name).type(dataForSignUp.LastName)
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSignUp.Password)
    cy.get(selectors.Signup_Submit).click()
    cy.wait('@signup_submit')
    cy.get(selectors.username).type(dataForSignUp.Username)
    cy.get(selectors.password).type(dataForSignUp.Password)
    cy.get(selectors.sign_in).click()
    cy.wait('@login')
    cy.wait('@graphql')
    cy.wait('@notifications')
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).type(complete_onboarding.BankName)
    cy.get(selectors.routing_number).type(complete_onboarding.RoutingNumber)
    cy.get(selectors.account_number).type(complete_onboarding.AccountNumber)
    cy.get(selectors.click_save_bank).click()
    cy.wait('@graphql')
    cy.get(selectors.click_done).click()
    cy.wait('@graphql')
    cy.get(selectors.btnBankAccounts).click()
    cy.wait('@graphql')
    cy.url().should('include', '/')
})

Cypress.Commands.add('deleteBankAccount', () => {
    cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    cy.get(selectors.first_Name).type(dataForSingUpAndDeleteBankAccount.FirstName)
    cy.get(selectors.last_Name).type(dataForSingUpAndDeleteBankAccount.LastName)
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.ConfirmPassword).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.Signup_Submit).click()
    cy.wait('@signup_submit')
    cy.get(selectors.username).type(dataForSingUpAndDeleteBankAccount.Username)
    cy.get(selectors.password).type(dataForSingUpAndDeleteBankAccount.Password)
    cy.get(selectors.sign_in).click()
    cy.wait('@login')
    cy.wait('@graphql')
    cy.wait('@notifications')
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.clickNext).click()
    cy.get(selectors.bankName).type(complete_onboarding.BankName)
    cy.get(selectors.routing_number).type(complete_onboarding.RoutingNumber)
    cy.get(selectors.account_number).type(complete_onboarding.AccountNumber)
    cy.get(selectors.click_save_bank).click()
    cy.wait('@graphql')
    cy.get(selectors.click_done).click()
    cy.wait('@graphql')
    cy.get(selectors.btnBankAccounts).click()
    cy.wait('@graphql')
    cy.get(selectors.btnBankAccounts).click()
    cy.get(selectors.btnDeleteBankAccounts).click()
})


Cypress.Commands.add('dataForLoginTransaction', () => {
    cy.get(selectors.username).type(dataForLoginTransaction.CreatedAccount)
    cy.get(selectors.password).type(dataForLoginTransaction.CreatedPassword)
    cy.get(selectors.sign_in).click()
})

Cypress.Commands.add ('dataForLoginReceiver', () => {
    cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
    cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
    cy.get(selectors.sign_in).click()
})






