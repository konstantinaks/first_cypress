export const selectors = {
    logo_image: '.makeStyles-logo-3',
    title_text: '.MuiTypography-h5',
    fieldUsername: '#username',
    fieldPassword: '#password',
    placeholderPassword: '#password-label',
    placeholderUsername: '#username-label',
    outside: '.makeStyles-root-1',
    checkboxOn: '.PrivateSwitchBase-input-14',
    checkboxOff: '.PrivateSwitchBase-input-14',
    sinnInDisabled: '[data-test="signin-submit"]',
    haveDontHaveAnAccountSignUp: '[data-test="signup"]',
    haveText: '[data-test="signup"]',
    click_Link: '[data-test="signup"]',
    licenseText: '.MuiTypography-body2',
    copyright: '[rel="noopener noreferrer"]',
    first_Name: '#firstName',
    last_Name: '#lastName',
    username: '#username',
    password: '#password',
    ConfirmPassword: '#confirmPassword',
    Signup_Submit: '[data-test="signup-submit"]',
    sign_in: '[data-test="signin-submit"]',
    modal: '[data-test="user-onboarding-dialog-content"]',
    clickNext: '[data-test="user-onboarding-next"]',
    bankName: '#bankaccount-bankName-input',
    routing_number: '#bankaccount-routingNumber-input',
    account_number: '#bankaccount-accountNumber-input',
    click_save_bank: '[data-test="bankaccount-submit"]',
    click_done: '[data-test="user-onboarding-next"]',
    logout_btn: '[data-test="sidenav-signout"]',
    usernameOrPasswordIsInvalid:'[data-test="signin-error"]',
    messagePasswordMustContainAtLeast4Characters: '#password-helper-text',
    messageFirstNameIsRequired: '#firstName-helper-text',
    messageLastNameIsRequired: '#lastName-helper-text',
    messageUsernameIsRequired: '#username-helper-text',
    messageEnterYourPassword: '#password-helper-text',
    messageConfirmYourPassword: '#confirmPassword-helper-text',
    messagePasswordDoesNotMatch: '#confirmPassword-helper-text',
    messageUsernameOrPasswordIsInvalid: '[data-test="signin-error"]',
    messageEnterABankName: '#bankaccount-bankName-input-helper-text',
    messageEnterAValidBankRoutingNumber: '#bankaccount-routingNumber-input-helper-text',
    messageEnterAValidBankAccountNumber: '#bankaccount-accountNumber-input-helper-text',
    btnBankAccounts: '[data-test="sidenav-bankaccounts"]',
    btnDeleteBankAccounts: '[data-test="bankaccount-delete"]',
    btn: '[data-test="bankaccount-new"]',
    btnCreateNewTransaction: '[data-test="nav-top-new-transaction"]',
    transaction_list: '[data-test="users-list"]',
    amountField: '#amount',
    addANoteField: '#transaction-create-description-input',
    payBtn: '[data-test="transaction-create-submit-payment"]',
    requestBtn: '[data-test="transaction-create-submit-request"]',
    homeBtn: '[data-test="sidenav-home"]',
    messagePleaseEnteraValidAmount: '#transaction-create-amount-input-helper-text',
    messagePleaseEnteraNote: '#transaction-create-description-input-helper-text',
    returnToTransactionsBtn: '[data-test="new-transaction-return-to-transactions"]',
    messageTransactionSubmitted: '[data-test="alert-bar-success"]',
    textYourTransactionPayment: '[class="ReactVirtualized__Grid ReactVirtualized__List"]',
    textYourTransactionRequest: '[class="ReactVirtualized__Grid ReactVirtualized__List"]',
    searchField: '[data-test="user-list-search-input"]',
    fieldWithAttribute: '.MuiGrid-spacing-xs-1',
    btnEveryone: '[data-test="nav-public-tab"]',
    btnFriends: '[data-test="nav-contacts-tab"]',
    btnMine: '[data-test="nav-personal-tab"]',
    acceptRequestBtn: '[data-test*="transaction-accept-request"]',
    rejectBtn: '[data-test*="transaction-reject-request"]'




}

export const dataForSignUp = {
    FirstName: generateData(),
    LastName: generateData(),
    Username: generateData(),
    Password: generateData(),
    ErrorPassword: '!@#$%^&*()'
}

export const complete_onboarding = {
    BankName: "RandomBankName",
    RoutingNumber: 'BankNAME1',
    AccountNumber: '1122334456'
}

export const dataForLoginTransaction = {

    CreatedAccount: "Katharina_Bernier",
    CreatedPassword: "s3cret"

}

export  const dataForLoginReceiver = {
    ReceiverUsername: 'Tavares_Barrows',
    ReceiverPassword: 's3cret'
}

function generateData() {
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

export const dataForSingUpAndDeleteBankAccount = {
    FirstName: credential(),
    LastName: credential(),
    Username: credential(),
    Password: credential(),
    ErrorPassword: '!@#$%^&*()'
}

function credential() {
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