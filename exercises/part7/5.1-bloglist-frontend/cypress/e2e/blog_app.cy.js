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

describe("When logged in", function () {
  beforeEach(function () {
    cy.resetDatabase();
    cy.createUser(testUser);
    cy.loginUser(testUser);
    cy.visit("/");
  });

  it("a blog can be created", function () {
    cy.contains("new blog").click();
    cy.get("#form-title").type(testBlog.title);
    cy.get("#form-author").type(testBlog.author);
    cy.get("#form-url").type(testBlog.url);
    cy.get("#form-submit").click();
    cy.contains(`a new blog ${testBlog.title} by ${testBlog.author}`);
  });

  it("invalid blog cannot be created", function () {
    cy.contains("new blog").click();
    cy.get("#form-submit").click();
    cy.contains("Blog validation failed");
  });
});

describe("When user has a created blog", function () {
  beforeEach(function () {
    cy.resetDatabase();
    cy.createUser(testUser);
    cy.loginUser(testUser);
    cy.createBlog(testBlog);
    cy.visit("/");
  });

  it("user can see blog", function () {
    cy.get(".blog");
  });

  it("user can see blog details", function () {
    cy.contains("show").click();
  });

  it("user can like a blog", function () {
    cy.contains("show").click();
    cy.get(".blog-like-button").click();
    cy.get(".blog-likes").contains("1");
  });

  it("user can delete a blog", function () {
    cy.contains("show").click();
    cy.get(".blog-delete-button").click();
    cy.contains("successfully deleted");
  });

  it("user cannot delete another user's blog", function () {
    const testUser2 = {
      name: "name2",
      username: "username2",
      password: "password2",
    };

    cy.contains("logout").click();
    cy.createUser(testUser2);
    cy.loginUser(testUser2);

    cy.contains("show").click();
    cy.get(".blog-delete-button").click();
    cy.contains("unauthorized");
  });

  it("blogs are ordered according to most likes", function () {
    const testBlog2 = { title: "title2", author: "author2", url: "url2" };
    cy.createBlog(testBlog2);
    cy.visit("/");

    const blog1 = cy.get(".blog").eq(0);
    const blog2 = cy.get(".blog").eq(1);

    blog1.contains("show").click();
    cy.get(".blog-like-button").click();
    cy.contains("1");
    cy.visit("/");

    blog2.contains("show").click();
    cy.get(".blog-like-button").click();
    cy.contains("1");
    cy.get(".blog-like-button").click();
    cy.contains("2");
    cy.visit("/");

    cy.get(".blog").eq(0).contains(testBlog2.title);
    cy.get(".blog").eq(1).contains(testBlog.title);
  });
});
