beforeEach(() => {
    cy.visit("/");
});


describe("Checking HTML baselayout", () => {
    it("Should get inputfield", () => {
        cy.get("input").should("exist");
    })

    it("Should get empty inputfield", () => {
        cy.get("input").should("contain", "");
    })

    it("Should get button", () => {
        cy.get("button").should("exist");
    })

    it("Should get buttontext", () => {
        cy.get("button").contains("Sök").should("exist");
    })
});

describe("Checking if typing and clicking works", () => {
    it("Should be able to type in inputfield", () => {
        cy.get("input").type("Goodfellas").should("have.value", "Goodfellas");
    })

    it("Should be able to press button", () => {
        cy.get("button").click();
    })
});

describe("Checking if error message shows with empty inputfield or movie that does not exist", () => {
    it("Should show error message if the inputfield is empty", () => {
        cy.get("button").click();
        cy.get("p").contains("Inga sökresultat att visa").should("exist");
      })

    it("Should show error message if the wrong movie title is written", () => {
        cy.get("input").type("Goodfellass").should("exist");
        cy.get("button").click();
        cy.get("p").contains("Inga sökresultat att visa").should("exist");
    })
});

describe("Checking if getting movies from api works", () => {
    it("Should put movie in movie-container when button is pressed", () => {
        cy.intercept("GET", "http://omdbapi.com/*", {fixture: "MOVIES"});
        cy.get("input").type("Goodfellas").should("exist");
        cy.get("button").click();
        cy.get("h3").contains("Goodfellas").should("exist");
    })
});

describe("Checks mock data", () => {
    it("Shouldfind mock data", () => {
        cy.intercept("GET", "http://omdbapi.com/*", {fixture: "MOVIES"}).as("movieFetch");
        cy.get("input").type("Goodfellas").should("have.value", "Goodfellas");
        cy.get("button").click();
        cy.wait("@movieFetch").its("request.url").should("contain", "Goodfellas");
        cy.get("h3").contains("Goodfellas").should("exist");
    });
})
