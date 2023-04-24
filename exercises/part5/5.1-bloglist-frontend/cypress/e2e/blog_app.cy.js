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
      cy.get("#login-submit").click();
      cy.contains("sucessfully logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#login-username").type(testUser.username);
      cy.get("#login-password").type("invalidPassword");
      cy.get("#login-submit").click();
      cy.contains("invalid username or password");
    });
  });
});

describe.only("When logged in", function () {
  beforeEach(function () {
    cy.resetDatabase();
    cy.createUser(testUser);
    cy.loginUser(testUser);
    cy.visit("/");
  });

  it("A blog can be created", function () {
    cy.contains("new blog").click();
    cy.get("#form-title").type(testBlog.title);
    cy.get("#form-author").type(testBlog.author);
    cy.get("#form-url").type(testBlog.url);
    cy.get("#form-submit").click();
    cy.contains(`a new blog ${testBlog.title} by ${testBlog.author}`);
  });

  it("Invalid blog cannot be created", function () {
    cy.contains("new blog").click();
    cy.get("#form-submit").click();
    cy.contains("Blog validation failed");
  });
});
