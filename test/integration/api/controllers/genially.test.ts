import request from "supertest";
import app from "../../../../src/api/app";
import CreateGeniallyService from "../../../../src/contexts/core/genially/application/CreateGeniallyService";
import { withMongo } from "../../../utils/withMongo";

withMongo(() => {
  describe("/genially", () => {
    describe("POST /genially", () => {
      it("returns a 201 created status code if the genially is created", async () => {
        const response = await request(app)
          .post("/genially")
          .send({ name: "name", id: "id" });

        expect(response.status).toEqual(201);
      });

      it("returns created genially", async () => {
        const response = await request(app)
          .post("/genially")
          .send({ name: "name", id: "id" });

        expect(response.body).toEqual({ data: { name: "name", id: "id" } });
      });

      it("returns a 400 bad request error if the genially breaks any creation rule (in this case name too short)", async () => {
        const response = await request(app)
          .post("/genially")
          .send({ name: "na", id: "id" });

        expect(response.status).toEqual(400);
        expect(response.body).toEqual({
          message:
            "Genially cannot be created with name: na (less than 3 characters)",
        });
      });

      it("returns a 500 internal server error if the service throws an unknown error", async () => {
        const spy = jest.spyOn(CreateGeniallyService.prototype, "execute");
        spy.mockImplementationOnce(() => Promise.reject());

        const response = await request(app)
          .post("/genially")
          .send({ name: "na", id: "id" });

        expect(response.status).toEqual(500);
      });
    });

    describe("DELETE /genially/:geniallyId", () => {
      it("returns 204 no content status code if the genially is deleted", async () => {
        const subject = request(app);
        await subject
          .post("/genially")
          .send({ name: "name", id: "id" })
          .expect(201);

        const response = await subject.delete("/genially/id");

        expect(response.status).toEqual(204);
      });

      it("returns a 404 not found status code if the genially does not exist", async () => {
        const response = await request(app).delete("/genially/id");

        expect(response.status).toEqual(404);
      });
    });

    describe("PUT /genially/:geniallyId/rename", () => {
      it("returns 200 ok status code if the genially is renamed", async () => {
        const subject = request(app);
        await subject
          .post("/genially")
          .send({ name: "name", id: "id" })
          .expect(201);

        const response = await subject
          .put("/genially/id/rename")
          .send({ name: "newName" });

        expect(response.status).toEqual(200);
      });

      it("returns the genially with the new name", async () => {
        const subject = request(app);
        await subject
          .post("/genially")
          .send({ name: "name", id: "id" })
          .expect(201);

        const response = await subject
          .put("/genially/id/rename")
          .send({ name: "newName" });

        expect(response.body).toMatchObject({
          data: { name: "newName", id: "id" },
        });
      });

      it("returns a 404 not found status code if the genially does not exist", async () => {
        const response = await request(app)
          .put("/genially/id/rename")
          .send({ name: "newName" });

        expect(response.status).toEqual(404);
      });
    });

    describe("GET /genially/count", () => {
      it("returns 0 if there is no genially", async () => {
        const response = await request(app).get("/genially/count").expect(200);

        expect(response.body).toMatchObject({ data: { count: 0 } });
      });

      it("returns 1 if there is one genially", async () => {
        const subject = request(app);
        await subject.post("/genially").send({ name: "name", id: "id" });
        const response = await subject.get("/genially/count").expect(200);

        expect(response.body).toMatchObject({ data: { count: 1 } });
      });
    });
  });
});
