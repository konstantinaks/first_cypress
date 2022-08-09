import {selectors, dataForSignUp, dataForLoginTransaction, dataForLoginReceiver} from "../selectors/selectors";
import {dataForLoginUserA, dataForLoginUserB, notifications} from "../selectors/notifications";

let sumForPay = 300;
let sumForRequest = 500;
let messageP = 'Your transaction payment';
let messageR = 'Your transaction request';

const userA = {
    username: "Katharina Bernier",
    name: "Edgar Johns"
};

const userB = {
    username: "Tavares Barrows",
    name: "Arely Kertzmann"
};

describe('tests for notification', () => {

    before("signin", () => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login')
        cy.intercept('POST', '/graphql').as('graphql')
        cy.intercept('GET', '/notifications').as('notifications')
        cy.intercept('GET', '/users').as('users')
        cy.intercept('POST', '/transactions').as('transactions')
        cy.intercept('GET', '/checkAuth').as('checkAuth')
        cy.intercept("POST", "/likes/*").as("like");
    })


    it('When user A likes a transaction of user B, user B should get notification that user A liked transaction', () => {
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
        cy.get(notifications.logout_btn).click()
        cy.get(selectors.username).type(dataForLoginUserB.usernameForUserB)
        cy.get(selectors.password).type(dataForLoginUserB.passwordForUserB)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(notifications.transactionList).contains(`${userA.name} paid ${userB.name}`).first().click({ force: true })
        cy.get(notifications.likeButton).click()
        cy.wait('@like')
        cy.get(notifications.logout_btn).click()


        cy.get(selectors.username).type(dataForLoginReceiver.ReceiverUsername)
        cy.get(selectors.password).type(dataForLoginReceiver.ReceiverPassword)
        cy.get(selectors.sign_in).click()
        cy.wait('@login')
        cy.wait('@graphql')
        cy.wait('@notifications')
        cy.get(notifications.notificationBtn).click()
        cy.wait('@notifications')
        cy.get(notifications.notificationslist).should("contain", `${userB.name} liked a transaction`);





    })




})