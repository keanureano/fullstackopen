const testUser = { name: "name", username: "username", password: "password" };
const testBlog = { title: "title", author: "author", url: "url" };

describe("Blog app", () => {
  beforeEach(function () {
    cy.resetDatabase();
    cy.createUser(testUser);
    cy.visit("/");
  });

  it("shows login form", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#login-username").type(testUser.username);
      cy.get("#login-password").type(testUser.password);
      cy.get("#login-button").click();
      cy.contains("sucessfully logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#login-username").type(testUser.username);
      cy.get("#login-password").type("invalidPassword");
      cy.get("#login-button").click();
      cy.contains("invalid username or password");
    });
  });
});
