import "./commands";
import "cypress-xpath";
import "cypress-axe";

Cypress.on("uncaught:exception", (err, runnable) => {
  // eslint-disable-next-line no-console
  console.error("uncaught:exception", err, runnable);

  // returning false here prevents Cypress from failing the test
  return false;
});
