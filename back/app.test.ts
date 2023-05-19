import request from "supertest";
import app from "./app";
import { STOPLIGHT, STOPLIGHT_BLURRED } from "./examples/testfiles";

describe("behavior on /jimp", () => {
  describe("hello world", () => {
    test("should respond with a 200 status code and a message", async () => {
      const response = await request(app).get("/jimp");
      expect(response.statusCode).toBe(200);
      expect(response.body.msg).toBe('Nothing to get -- yet.');

    });
  });
  describe("a gaussian blur is returned as expected", () => {
    test("should respond with a 200 status code and a message", async () => {
      const response = await request(app).post("/jimp/gaussian").send({
        image: STOPLIGHT,
      });
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(STOPLIGHT_BLURRED);
    });
  });
});
