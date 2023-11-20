import request from "supertest";
import app from "../src/app";

test("Test Hello World", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World");
});

test("Test Query Parameter", async () => {
  const response = await request(app).get("/").query({ name: "World" });
  expect(response.text).toBe("Hello World");
});

test("Test Request URL", async () => {
  const response = await request(app)
    .get("/tutuplapak/search")
    .query({ keyword: "infinix" });

  expect(response.body).toEqual({
    path: "/tutuplapak/search",
    originalUrl: "/tutuplapak/search?keyword=infinix",
    hostname: "127.0.0.1",
    protocol: "http",
    secure: false,
  });
});

test("Test Query Parameter", async () => {
  const response = await request(app)
    .get("/warungpedia/search")
    .query({ q: "infinix", city: "gotham" });
  console.info(response.text);
  expect(response.text).toBe("Result: infinix City: gotham");
});

test("Test Header", async () => {
  const response = await request(app)
    .get("/header")
    .set("Accept", "text/plain");
  expect(response.text).toBe("type: text/plain");
});
