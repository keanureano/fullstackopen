/* eslint-disable linebreak-style */

Cypress.Commands.add("loginUser", function ({ username, password }) {
  cy.request("POST", "api/login", {
    username,
    password,
  }).then(function ({ body }) {
    localStorage.setItem("localStorageUser", JSON.stringify(body));
    cy.visit("/");
  });
});

Cypress.Commands.add("createUser", function ({ name, username, password }) {
  cy.request({
    url: "api/users",
    method: "POST",
    body: { name, username, password },
  });
});

Cypress.Commands.add("createBlog", function ({ title, author, url }) {
  cy.request({
    url: "api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("localStorageUser")).token,
    },
  });
});

Cypress.Commands.add("resetDatabase", function () {
  localStorage.clear();
  cy.request("POST", "api/testing/reset");
});
