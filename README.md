# Motability

## MOT_OLA_TS-001 - OLA - New Application

### Overview

I have added in a Motability Operation - MOT_OLA_TS-001 - New Application Test Strategy.docx after analysing the Tech Task requirements to outline the strategy for the testing required during the OLA New Application process.
An Excel Test Cases document (Motability Operation - MOT_OLA_TS-001 - New Application Test Cases.xlsx) has been included after defining acceptance criteria based off of the detials in the Tech Task document.
An example of the POST API call to the endpoint ```/api/v2/applications was done in Postman and file name = OLA_newApplication.postman_collection.json

### Example of Cypress Automation Regression Test Suite for OLA_newApplication

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
