const testUser = { name: "name", username: "username", password: "password" };
const testBlog = { title: "title", author: "author", url: "url" };

describe("Blog app", () => {
  before(function () {
    cy.resetDatabase();
    cy.visit("/");
  });

  it("login form is shown", function () {
    cy.contains("login");
  });
});
