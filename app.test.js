const request = require("supertest");
const app = require("./app");

describe("Todos API", () => {
  it("GET /todos --> array todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
  it("GET /todos --> validates request body ", () => {
    return request(app)
      .post("/todos")
      .send({
        name: 123,
      })
      .expect(422)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: true,
          })
        );
      });
  });
  it("GET /todos/idnotexisting -->  returns 404 if not found ", () => {
    return request(app).get("/todos/3450990").expect(404);
  });
  it("GET /todos/:id --> return a specific todo by id", () => {
    return request(app)
      .get("/todos/123")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });
  it("POST /todos -->  return a newly created todo", () => {
    return request(app)
      .post("/todos")
      .expect("Content-Type", /json/)
      .send({
        name: "brush teeth",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "brush teeth",
            completed: false,
          })
        );
      });
  });
});
