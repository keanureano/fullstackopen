/* eslint-disable linebreak-style */

Cypress.Commands.add("login", function ({ username, password }) {
  cy.request("POST", "api/login", {
    username,
    password,
  }).then(function ({ body }) {
    localStorage.setItem("localStorageUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", function ({ title, author, url }) {
  cy.request({
    url: "api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("localStorageUser")),
    },
  });
});

Cypress.Commands.add("resetDatabase", function () {
  cy.request("POST", "api/testing/reset");
});
