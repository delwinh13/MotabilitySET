import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const randomFirstName = () => {
  const firstNames = ["John", "Jane", "Alice", "Bob"];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};
const randomLastName = () => {
  const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};
const randomEmail = () => {
  const domains = ["example.com", "test.com", "demo.com"];
  return `${randomFirstName().toLowerCase()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
};
const randomDOB = () => {
  const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
  const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
  const year = Math.floor(Math.random() * (2023 - 1950 + 1)) + 1950; // Random year between 1950 and 2023
  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

Given("Admin user has logged on to the OLA Application site", () => {
  cy.openOLAApplication();
  cy.adminLogin("adminUsername", "adminPassword");
});

Then("I am on the OLA Application home page", () => {
  cy.checkOLAHomePage();
});

When("I click on the Create New Account button", () => {
  cy.getElementByTestId("createNewAccount__button").click();
  cy.log("Clicked on Create New Account button");
});

Then("I can see the Create New Account form", () => {
  cy.getElementByTestId("createNewAccount__header").should("be.visible");
  cy.getElementByTestId("createNewAccount__header").contains(
    "Create a new account"
  );
});

When("I fill in the Create New Account form with valid details", () => {
  // Select vehicle type (the below code is an example of how to fill in the vehicle type section)
  cy.getElementByTestId("createNewAccount__vehicleRegistration")
    .should("be.visible")
    .type("ABC1234");
  cy.getElementByTestId("createNewAccount__vehicleMake").type("Toyota");
  cy.getElementByTestId("createNewAccount__vehicleModel").type("Corolla");
  cy.getElementByTestId("createNewAccount__vehicleColour").type("Blue");
  cy.getElementByTestId("createNewAccount__vehicleYear").type("2020");
  cy.getElementByTestId("createNewAccount__vehicleInsurance")
    .click()
    .select("Yes");

  // Customer details (the below code is an example of how to fill in the customer details section)
  cy.getElementByTestId("createNewAccount__firstName")
    .should("be.visible")
    .type(randomFirstName());
  cy.getElementByTestId("createNewAccount__lastName").type(randomLastName());
  cy.getElementByTestId("createNewAccount__title").click().select("Mr");
  cy.getElementByTestId("createNewAccount__dateOfBirth").type(randomDOB());
  cy.getElementByTestId("createNewAccount__nino").type("ST123456A");
  cy.getElementByTestId("createNewAccount__residentialCareHome")
    .click()
    .select("Yes");
  cy.getElementByTestId("createNewAccount__twentyFourHourCare")
    .click()
    .select("Yes");
  cy.getElementByTestId("createNewAccount__mobilePhoneNumber")
    .click()
    .select("Yes");
  cy.getElementByTestId("createNewAccount__homePhoneNumber").type(
    "01313120800"
  );
  cy.getElementByTestId("createNewAccount__email").type(randomEmail());
  cy.getElementByTestId("createNewAccount__addressLine1").type("Flat 2");
  cy.getElementByTestId("createNewAccount__addressLine2").type("Main Road");
  cy.getElementByTestId("createNewAccount__addressLine3").type("");
  cy.getElementByTestId("createNewAccount__addressLine4").type("");
  cy.getElementByTestId("createNewAccount__postcode")
    .should("be.visible")
    .type("EH1 2PA");

  // Vehicle adaptations (the below code is an example of how to fill in the vehicle adaptations section)
  cy.getElementByTestId("createNewAccount__adaptationType")
    .should("be.visible")
    .type("Hand Controls");
  cy.getElementByTestId("createNewAccount__adaptationDescription").type(
    "Hand Controls for accelerator and brake"
  );
  cy.getElementByTestId("createNewAccount__adaptationFitted")
    .click()
    .select("Yes");
  cy.getElementByTestId("createNewAccount__adaptationFittedDate").type(
    "20-02-2020"
  );
});

When("I click on the Submit button", () => {
  cy.getElementByTestId("createNewAccount__submit").click();
  cy.log("Clicked on Submit button");
});

// Eligibility Checks
// The following code is an example of how to check the eligibility of the driver

let driverWithAutomaticLicenceCannotDriveManualVehicle = true;
const driverWithAutomaticLicenceCannotDriveManualVehicleMessage =
  "Driver with automatic licence cannot drive manual vehicle";
if (driverWithAutomaticLicenceCannotDriveManualVehicle) {
  When(
    "I see a validation message for the vehicle type and driver licence type",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage")
        .should("be.visible")
        .contains(driverWithAutomaticLicenceCannotDriveManualVehicleMessage);
      cy.log("Validation message is visible");
    }
  );
} else if (!driverWithAutomaticLicenceCannotDriveManualVehicle) {
  When(
    "I do not see a validation message for the vehicle type and driver licence type",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage").should(
        "not.exist"
      );
      cy.log("Validation message is not visible");
    }
  );
}

let atLeastOneDriverWithFullLicence = true;
const atLeastOneDriverWithFullLicenceMessage =
  "At least one driver must have a full licence";
if (atLeastOneDriverWithFullLicence) {
  When("I see a validation message for the driver licence type", () => {
    cy.getElementByTestId("createNewAccount__validationMessage")
      .should("be.visible")
      .contains(atLeastOneDriverWithFullLicenceMessage);
    cy.log("Validation message is visible");
  });
} else if (!atLeastOneDriverWithFullLicence) {
  When("I do not see a validation message for the driver licence type", () => {
    cy.getElementByTestId("createNewAccount__validationMessage").should(
      "not.exist"
    );
    cy.log("Validation message is not visible");
  });
}

let driverIsDisqualified = true;
const driverIsDisqualifiedMessage = "Driver is disqualified from driving";
if (driverIsDisqualified) {
  When("I see a validation message for the driver disqualification", () => {
    cy.getElementByTestId("createNewAccount__validationMessage")
      .should("be.visible")
      .contains(driverIsDisqualifiedMessage);
    cy.log("Validation message is visible");
  });
} else if (!driverIsDisqualified) {
  When(
    "I do not see a validation message for the driver disqualification",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage").should(
        "not.exist"
      );
      cy.log("Validation message is not visible");
    }
  );
}

// Driver licence has 4 or more endorsements in the last 4 years from categories G, H, and I combined.
let dagV2DriverLicenceCategoryGHIEndorsement = true;
const dagV2DriverLicenceCategoryGHIEndorsementMessage =
  "Driver has a GHI endorsement on their licence";
if (dagV2DriverLicenceCategoryGHIEndorsement) {
  When(
    "I see a validation message for the driver licence category and endorsement",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage")
        .should("be.visible")
        .contains(dagV2DriverLicenceCategoryGHIEndorsementMessage);
      cy.log("Validation message is visible");
    }
  );
} else if (!dagV2DriverLicenceCategoryGHIEndorsement) {
  When(
    "I do not see a validation message for the driver licence category and endorsement",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage").should(
        "not.exist"
      );
      cy.log("Validation message is not visible");
    }
  );
}

// Driver has two or more endorsements in the last 4 years from category G and has a conviction date in the past 4 years.
let dagV2DriverLicenceCategoryGEndorsement = true;
const dagV2DriverLicenceCategoryGEndorsementMessage =
  "Driver has a G endorsement on their licence";
if (dagV2DriverLicenceCategoryGEndorsement) {
  When(
    "I see a validation message for the driver licence category G endorsement",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage")
        .should("be.visible")
        .contains(dagV2DriverLicenceCategoryGEndorsementMessage);
      cy.log("Validation message is visible");
    }
  );
} else if (!dagV2DriverLicenceCategoryGEndorsement) {
  When(
    "I do not see a validation message for the driver licence category G endorsement",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage").should(
        "not.exist"
      );
      cy.log("Validation message is not visible");
    }
  );
}

// Driver has any endorsements in the last 4 years from category F and has a conviction date in the past 4 years.
let dagV2DriverLicenceCategoryFEndorsement = true;
const dagV2DriverLicenceCategoryFEndorsementMessage =
  "Driver has an F endorsement on their licence";
if (dagV2DriverLicenceCategoryFEndorsement) {
  When(
    "I see a validation message for the driver licence category F endorsement",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage")
        .should("be.visible")
        .contains(dagV2DriverLicenceCategoryFEndorsementMessage);
      cy.log("Validation message is visible");
    }
  );
} else if (!dagV2DriverLicenceCategoryFEndorsement) {
  When(
    "I do not see a validation message for the driver licence category F endorsement",
    () => {
      cy.getElementByTestId("createNewAccount__validationMessage").should(
        "not.exist"
      );
      cy.log("Validation message is not visible");
    }
  );
}

Then("I should see a confirmation message", () => {
  cy.getElementByTestId("createNewAccount__confirmationMessage")
    .should("be.visible")
    .contains("Your account has been created successfully");
  cy.log("Confirmation message is visible");
});
