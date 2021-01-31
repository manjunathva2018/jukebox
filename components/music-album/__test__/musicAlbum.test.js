const request = require("supertest");
const app = require("../../../app");

it("returns a 201 on successful music album creation", async () => {
  return request(app)
    .post("/api/musicalbum")
    .send({
      albumName: "something",
      dateOfRelease: "1 july 2020",
      genre: [],
      price: 110,
      description: "something somthing test testing",
    })
    .expect(201);
});

it("returns a 422 with required fields", async () => {
  return request(app).post("/api/musicalbum").send({}).expect(422);
});

it("returns a 422 with albumName length must be at least 5 characters long and price must be greater than or equal to 100", async () => {
  await request(app)
    .post("/api/musicalbum")
    .send({
      albumName: "so",
      dateOfRelease: "2 july 2020",
      genre: [],
      price: 110,
      description: "something somthing test testing",
    })
    .expect(422);
  return await request(app)
    .post("/api/musicalbum")
    .send({
      albumName: "smooth",
      dateOfRelease: "2 july 2020",
      genre: [],
      price: 11,
      description: "something somthing test testing",
    })
    .expect(422);
});
