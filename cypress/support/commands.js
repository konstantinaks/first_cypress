import {
    complete_onboarding, dataForLoginReceiver, dataForLoginTransaction, dataForSignUp,
    dataForSingUpAndDeleteBankAccount, selectors,
} from "../selectors/selectors";

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
})

Cypress.Commands.add('complete_onboarding', () => {
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
})

Cypress.Commands.add('deleteBankAccount', () => {
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

Cypress.Commands.add('dataForLoginReceiver', () => {
    cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
    cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
    cy.get(selectors.signIn).click()
})

const apiUrl = "http://localhost:3001"

Cypress.Commands.add("loginByApi", (username, password) => {
    cy.window({log: false}).then((win) => win.authService.send("LOGIN", {username, password}))
})

Cypress.Commands.add("signupApi", (username, password) => {
    cy.request("POST", `${apiUrl}/users`, {
        firstName: "FirstName",
        lastName: "SecondName",
        username: username,
        password: password,
        confirmPassword: password,
    })
})

Cypress.Commands.add("logoutApi", () => {
    cy.window({log: false}).then((win) => win.authService.send("LOGOUT", {}))
    cy.wait(1000)
})

Cypress.Commands.add("create_bank_account_API", (bankName, accountNumber, routingNumber) => {
    cy.request("POST", `${apiUrl}/bankAccounts`, {
        bankName,
        accountNumber,
        routingNumber,
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
})

Cypress.Commands.add("delete_bank_account_API", (bankAccountId) => {
    cy.request("DELETE", `${apiUrl}/bankAccounts/${bankAccountId}`).should( (response) => { expect(response.status).to.eq(200)
        })
})

Cypress.Commands.add("add_contact_API", (userId) => {
    cy.request("POST", `${apiUrl}/contacts`, {
        contactUserId: userId,
    }) .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.contact.id).to.be.a("string");
        })
})

Cypress.Commands.add("delete_contact_API", (userId) => {
    cy.request("DELETE", `${apiUrl}/contacts/${userId}`).should((response) => {
        expect(response.status).to.eq(200);
    })
})
