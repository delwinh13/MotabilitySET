# Motability

## MOT_OLA_TS-001 - OLA - New Application

### Overview

Testing suite that performs automation tests across the OLA Application and ensures basic functionality is still working. Technologies included are:

- Cypress
- Cypress Cloud ([Project Here](https://cloud.cypress.io/projects/[projectId]/runs))
- Github Actions: To run the tests automatically

### Setup

1. Clone down the repo
2. Run `npm install` to install required deps
3. Update the `cypress.env.json` file with the OLA dealer username and password
4. Run `npm run cypress:open`

### e2e

Within the cypress -> e2e folder there is the Step Definition (OLA_createNewAccount.ts) and the Feature (OLA_createNewAccount.feature) files for Creating a New Account using the OLA Application.
