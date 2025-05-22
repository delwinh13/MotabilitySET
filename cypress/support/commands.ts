Cypress.Commands.add("getElementByTestId", (testId: string) =>
  cy.get(`[data-testid="${testId}"]`)
);

// This command is used to open the OLA application
Cypress.Commands.add("openOLAApplication", () =>
  // It uses the Cypress environment variable to get the base URL
  cy.visit(`/`)
);
// This command is used to login as an admin user
Cypress.Commands.add("adminLogin", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("/")}/olaapi/user/login`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.wrap(response.body.token);
  });
});
// This command is used to check the home page of the OLA application
// It checks for the visibility of various elements on the page
Cypress.Commands.add("checkOLAHomePage", () => {
  ["header__logo", "createNewAccount__button"].forEach((homeScreenElement) => {
    cy.get(`[data-testid="${homeScreenElement}"]`).should("be.visible");
  });
  cy.log(`Admin user is on the OLA Home Page`);
});
