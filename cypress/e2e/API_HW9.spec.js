import {credentialsApi} from "../support/loginHelper";

const bankName = "NameBank2"
const accountNumber = "1234512312"
const routingNumber = "NameBank1"
let bankAccountId = ""
let username = credentialsApi()
const password = "Random12345"
let userId = "waf413bPn"

describe('Api tests', () => {

    before("Login", () => {
        cy.visit('/')
        cy.signupApi(username, password)
        cy.loginByApi(username, password)
    })

    it('Create bank account API', () => {
        cy.create_bank_account_API(bankName, accountNumber, routingNumber)
        cy.create_bank_account_API(bankName, accountNumber, routingNumber).then(
            (response) => {
                bankAccountId = response.body.account.id;})
    })

    it('Delete account bank API', () => {
        cy.delete_bank_account_API(bankAccountId)
    })

    it('Add contact API', () => {
        cy.add_contact_API(userId)
    })

    it("Delete contact API", () => {
        cy.delete_contact_API(userId)
    })

})


