class LoginPage {
  elements = {
    usernameInput: () => cy.get("#user-name"),
    passwordInput: () => cy.get("#password"),
    loginBtn: () => cy.get("#login-button"),
    errorMessage: () => cy.get('h3[data-test="error"]'),
  };

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginBtn().click();
  }

  submitLogin(username,password){
    if (username) {
      this.elements.usernameInput().clear().type(username);
    } else {
      this.elements.usernameInput().clear();
    }

    if (password) {
      this.elements.passwordInput().clear().type(password);
    } else {
      this.elements.passwordInput().clear();
    }

    this.elements.loginBtn().click();
  }
}

export const loginPage = new LoginPage();
