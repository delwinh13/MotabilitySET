declare namespace Cypress {
  interface Chainable<Subject = any> {
    openOLAApplication(): Chainable<any>;
    adminLogin(username: string, password: string): Chainable<any>;
    checkOLAHomePage(): Chainable<any>;
    getElementByTestId(value: string): Chainable<JQuery<HTMLElement>>;
  }
}
