const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
jest.setTimeout(10000);

const addUser = async () => {
  await User.deleteMany({});
  const username = helper.initialUser.username;
  const passwordHash = await bcrypt.hash(helper.initialUser.password, 10);
  const user = new User({ username, passwordHash });
  await user.save();
};

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await addUser();
  });

  test("creation succeeds with fresh username", async () => {
    const usersBefore = await helper.usersInDb();

    const newUser = {
      username: "newUser",
      name: "newName",
      password: "newPassword",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await helper.usersInDb();
    expect(usersAfter.length).toBe(usersBefore.length + 1);

    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails if username or password is empty", async () => {
    const usersBefore = await helper.usersInDb();

    const emptyUser = {
      name: "test",
    };

    const result = await api
      .post("/api/users")
      .send(emptyUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username and password are required");

    const usersAfter = await helper.usersInDb();
    expect(usersBefore).toEqual(usersAfter);
  });

  test("creation fails if username or password is not at least 3 characters long", async () => {
    const usersBefore = await helper.usersInDb();

    const invalidUser = {
      username: "t",
      password: "t",
    };

    const validUser = {
      username: "tes",
      password: "tes",
    };

    const result = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    const usersAfterInvalid = await helper.usersInDb();
    expect(usersBefore).toEqual(usersAfterInvalid);

    await api
      .post("/api/users")
      .send(validUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfterValid = await helper.usersInDb();
    expect(usersAfterValid.length).toBe(usersBefore.length + 1);
  });

  test("creation fails if username is already taken", async () => {
    const usersBefore = await helper.usersInDb();

    const existingUser = {
      username: "test",
      name: "test",
      password: "test",
    };

    const result = await api
      .post("/api/users")
      .send(existingUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAfter = await helper.usersInDb();
    expect(usersBefore).toEqual(usersAfter);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
