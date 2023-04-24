const testUser = { name: "name", username: "username", password: "password" };
const testBlog = { title: "title", author: "author", url: "url" };

describe("Blog app", () => {
  before(function () {
    cy.request("POST", "api/testing/reset");
    cy.request("POST", "api/users", testUser);
  });

  beforeEach(function () {
    cy.visit("/");
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
    cy.contains("Blog app by Keanu Reaño, Fullstackopen 2023");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#login-username").type(testUser.username);
    cy.get("#login-password").type(testUser.password);
    cy.get("#login-button").click();
    cy.contains("sucessfully logged in");
  });

  it("user log in fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#login-username").type(testUser.username);
    cy.get("#login-password").type("wrong");
    cy.get("#login-button").click();
    cy.get(".notif-error").contains("invalid username or password");
    cy.contains("sucessfully logged in").should("not.exist");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password });
    });

    it("blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#blog-title").type(testBlog.title);
      cy.get("#blog-author").type(testBlog.author);
      cy.get("#blog-url").type(testBlog.url);
      cy.get("#blog-form").submit();
      cy.contains("a new blog");
    });

    it("blog can be showed and hidden", function () {
      cy.contains("show").click();
      cy.contains("url");
      cy.contains("hide").click();
      cy.contains("url").should("be.hidden");
    });

    it("blog can be liked", function () {
      cy.contains("show").click();
      cy.contains("like").click();
    });

    it("blog can be deleted", function () {
      cy.contains("show").click();
      cy.contains("delete").click();
    });
  });
});
