const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
jest.setTimeout(10000);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("test", 10);
    const user = new User({ username: "test", passwordHash });
    await user.save();
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
    expect(usersBefore).toEqual(usersAfter)
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
