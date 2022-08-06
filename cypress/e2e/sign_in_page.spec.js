import {selectors, dataForSignUp, dataForCreateBank} from "../selectors/selectors";


describe('UI tests for sign in page', () => {

     before('visiting sign in page', () => {
        cy.visit('/')
     })

    // Should display login errors
    it ('Check errors in sign in page', () => {

        cy.get(selectors.fieldUsername).type('qwerty')
        cy.get(selectors.fieldPassword).type('passwordtext')
        cy.get(selectors.sign_in).click()
        cy.get(selectors.usernameOrPasswordIsInvalid).should('be.visible').should('have.text', 'Username or password is invalid')
        cy.get(selectors.fieldUsername).type('NormalLogin')
        cy.get(selectors.fieldPassword).type('12').blur()
        cy.get(selectors.messagePasswordMustContainAtLeast4Characters).should('be.visible').should('have.text', 'Password must contain at least 4 characters')

    })

    //should display signup errors

    it('Check error in First name field' , () => {
        cy.get(selectors.click_Link).click()
        cy.get(selectors.first_Name).click().blur()
        cy.get(selectors.messageFirstNameIsRequired).should('be.visible').should('have.text', 'First Name is required')
    })

    it ('Check error in Last name field', () => {
        cy.get(selectors.last_Name).click().blur()
        cy.get(selectors.messageLastNameIsRequired).should('be.visible').should('have.text', 'Last Name is required')
    })

    it ('Check error in Usermane field', () => {
        cy.get(selectors.username).click().blur()
        cy.get(selectors.messageUsernameIsRequired).should('be.visible').should('have.text', 'Username is required')
    })

    it('Check errors in Password field', () => {
        cy.get(selectors.password).click().blur()
        cy.get(selectors.messageEnterYourPassword).should('be.visible').should('have.text', 'Enter your password')

        cy.get(selectors.password).type('0').blur()
        cy.get(selectors.messagePasswordMustContainAtLeast4Characters).should('be.visible').should('have.text', 'Password must contain at least 4 characters')
        cy.get(selectors.password).clear()
    })

    it ('Check errors in Confirm password field', () => {
        cy.get(selectors.ConfirmPassword).click().blur()
        cy.get(selectors.messageConfirmYourPassword).should('be.visible').should('have.text', 'Confirm your password')
        cy.get(selectors.password).type('12345')
        cy.get(selectors.ConfirmPassword).type('1234')
        cy.get(selectors.messagePasswordDoesNotMatch).should('be.visible').should('have.text', 'Password does not match')
    })


    it('custom command for user sign-up', () => {
        cy.dataForSignUp()
    })

    it('custom command for user login', () => {
        cy.dataForLogin()
    })

    it('custom command from display bank account form errors', () => {
        cy.dataDisplayBankAccountFormErrors()
    })


    it('custom command for create bank account', () => {
        cy.dataForCreateBank()
    })


    it('custom command for logout from an account', () => {
        cy.logoutFromAccount()

    })


    // should error for an invalid user

    it('should error for an invalid user', () => {
        cy.get(selectors.fieldUsername).type('non-existent user')
        cy.get(selectors.fieldPassword).type('non-existent user')
        cy.get(selectors.sign_in).click()
        cy.get(selectors.messageUsernameOrPasswordIsInvalid).should('be.visible').should('have.text', 'Username or password is invalid')
    })

    // should error for an invalid password for existing user

    it('should error for an invalid password for existing user', () => {
        cy.get(selectors.fieldUsername).type(dataForSignUp.Username)
        cy.get(selectors.fieldPassword).type(dataForSignUp.ErrorPassword)
        cy.get(selectors.sign_in).click()
        cy.get(selectors.messageUsernameOrPasswordIsInvalid).should('be.visible').should('have.text', 'Username or password is invalid')
    })

//////////////////////////

    // it('should show "Real World App logo"', () => {
    //     cy.get(selectors.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    // })
    //
    // it('should show "Sign in" title', () => {
    //     cy.get(selectors.title_text).should('be.visible').and('have.text', 'Sign in')
    // })
    //
    // it ('should show typeable Username field', () => {
    //     cy.get (selectors.fieldUsername).should('be.visible')
    // })
    //
    // it ('should show typeable Password field', () => {
    //     cy.get (selectors.fieldPassword).should('be.visible')
    // })
    //
    // it('should show Password placeholders', () => {
    //     cy.get (selectors.placeholderPassword).should('be.visible')
    // })
    //
    // it('should show Username placeholders', () => {
    //     cy.get (selectors.placeholderUsername).should('be.visible')
    // })
    //
    // it ('should show 'Username is required' error if user clicks on it and then click outside this field and didnt enter any value', () => {
    //     cy.get(selectors.outside).click()
    // })
    //
    // it('checkboxOn', () => {
    //     cy.get(selectors.checkboxOn).check().should('be.checked')
    // })
    //
    // it('checkboxOff', () => {
    //     cy.get(selectors.checkboxOff).uncheck().should('not.to.be.checked')
    // })
    //
    // it('sinnInDisabled', () => {
    //     cy.get(selectors.sinnInDisabled).should('be.disabled')
    // })
    //
    // it ('should have Don/t have an account? Sign Up', () => {
    //     cy.get (selectors.have_Dont_have_an_account_Sign_Up).should('be.visible')
    // })
    //
    // it ('haveText_Dont have an account? Sign Up', () => {
    //     cy.get(selectors.haveText).contains('Don\'t have an account? Sign Up')
    // })
    //
    //
    // it ('clickLink', () => {
    //     cy.get(selectors.click_Link).click()
    //     cy.go('back');
    // })
    //
    // it ('have Built by Text', () => {
    //     cy.get(selectors.licenseText).contains('Built by')
    // })
    //
    // //it ('clickCopyrightLink', () => {
    // //    cy.get(selectors.copyright).should('have.attr', 'href', 'https://cypress.io').click()
    // //})
    //
    // const FirstName = "Bob"
    // const LastName = "Dilan"
    // const Username = "Niklot2"
    // const Password = "12345"
    // const BankName = "LOXBank"
    // const RoutingNum = "NameBank1"
    // const AccountNum = "123456789"
    //
    //
    // it ('should allow a visitor to sign-up', () => {
    //     cy.get(selectors.haveDontHaveAnAccountSignUp).click()
    //     cy.get(selectors.first_Name).type(FirstName)
    //     cy.get(selectors.last_Name).type(LastName)
    //     cy.get(selectors.username).type(Username)
    //     cy.get(selectors.password).type(Password)
    //     cy.get(selectors.ConfirmPassword).type(Password)
    //     cy.get(selectors.Signup_Submit).click()
    //
    // })
    //
    // it('should allow a visitor to login', () => {
    //     cy.get(selectors.username).type(Username)
    //     cy.get(selectors.password).type(Password)
    //     cy.get(selectors.sign_in).click()
    //     cy.get(selectors.modal).should('be.visible')
    //     cy.get(selectors.clickNext).click()
    // })
    //
    // it('Create Bank Account', () => {
    //     cy.get(selectors.bankName).type(BankName)
    //     cy.get(selectors.routing_number).type(RoutingNum)
    //     cy.get(selectors.account_number).type(AccountNum)
    //     cy.get(selectors.click_save_bank).click()
    //     cy.get(selectors.click_done).click()
    //
    // })
    //
    // it('should allow a visitor to logout', () => {
    //     cy.get(selectors.logout_btn).click()
    // })
})
