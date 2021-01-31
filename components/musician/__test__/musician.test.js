const request = require("supertest");
const app = require("../../../app");

it("returns a 201 on successful musician creation", async () => {
  return request(app)
    .post("/api/musician")
    .send({
      name: "Joe",
      musicianType: "Vocalist",
    })
    .expect(201);
});

it("returns a 422", async () => {
  await request(app)
    .post("/api/musician")
    .send({
      name: "a",
      musicianType: "Vocalist",
    })
    .expect(422);
  return await request(app)
    .post("/api/musician")
    .send({
      name: "Akira",
      musicianType: "no",
    })
    .expect(400);
});
