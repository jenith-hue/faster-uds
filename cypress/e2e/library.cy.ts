describe("Faster demo", () => {
  beforeEach(() => cy.visit("/"));

  it("opens and closes the dialog through mouse and keyboard", () => {
    cy.contains("button", "Test").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("exposes an accessible dialog labelled by its title", () => {
    cy.contains("button", "Test").click();
    cy.get('[role="dialog"]')
      .should("be.visible")
      .and("have.attr", "aria-modal", "true")
      .and("have.attr", "aria-labelledby");
    cy.get('[role="dialog"]')
      .invoke("attr", "aria-labelledby")
      .then((titleId) => {
        cy.wrap(titleId).should("be.a", "string").and("not.be.empty");
        // Use a quoted attribute selector so generated ids (e.g. ":r1:") work.
        cy.get(`[id="${titleId}"]`).should("have.text", "Welcome to Faster");
      });
  });

  it("renders the dialog title, body and footer actions", () => {
    cy.contains("button", "Test").click();
    cy.get('[role="dialog"]').within(() => {
      cy.get("h2").should("have.text", "Welcome to Faster");
      cy.contains("Start with these primitives").should("be.visible");
      cy.contains("button", "Cancel").should("be.visible");
      cy.contains("button", "Continue").should("be.visible");
    });
  });

  it("moves focus into the dialog and restores it to the trigger on close", () => {
    const trigger = cy.contains("button", "Test");
    trigger.click();
    cy.get('[role="dialog"]').should("have.focus");
    cy.get("body").type("{esc}");
    cy.get('[role="dialog"]').should("not.exist");
    cy.contains("button", "Test").should("have.focus");
  });

  it("closes the dialog with the close button", () => {
    cy.contains("button", "Test").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get('button[aria-label="Close dialog"]').click();
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("closes the dialog when clicking the backdrop", () => {
    cy.contains("button", "Test").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get('[role="dialog"]').parent().click(10, 10);
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("renders accessible input details", () => {
    cy.get("label")
      .contains("Work email")
      .invoke("attr", "for")
      .then((inputId) => {
        cy.wrap(inputId).should("be.a", "string").and("not.be.empty");
        cy.get(`input[id="${inputId}"]`).should("have.attr", "aria-describedby");
      });
  });

  it("shows the placeholder and helper text for the input", () => {
    cy.get('input[placeholder="you@example.com"]')
      .invoke("attr", "aria-describedby")
      .then((hintId) => {
        cy.wrap(hintId).should("be.a", "string").and("not.be.empty");
        cy.get(`[id="${hintId}"]`).should("have.text", "We only use this for updates.");
      });
    cy.contains("We only use this for updates.").should("be.visible");
  });

  it("accepts typing in the email input", () => {
    cy.get('input[placeholder="you@example.com"]')
      .type("ada@example.com")
      .should("have.value", "ada@example.com");
  });

  it("renders the demo buttons with type=button", () => {
    cy.contains("button", "Test").should("have.attr", "type", "button");
    cy.contains("button", "Secondary action").should("have.attr", "type", "button");
  });

  it("shows the demo heading and eyebrow copy", () => {
    cy.get("h1").should("have.text", "Small, dependable UI primitives.");
    cy.contains("FASTER / UDS").should("be.visible");
    cy.contains("Button, Input, and Dialog.").should("be.visible");
  });
});
