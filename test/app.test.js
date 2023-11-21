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

test("Test Response Status", async () => {
  let response = await request(app).get("/account").query({ name: "batman" });
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello batman");

  response = await request(app).get("/account");
  expect(response.status).toBe(400);
});

test("Test Response Header", async () => {
  const response = await request(app).get("/resheader");
  expect(response.text).toBe("Hello Response");
  expect(response.get("X-Powered-By")).toBe("homurin");
  expect(response.get("X-Author")).toBe("fajrin");
});

test("Test Response Body", async () => {
  const response = await request(app).get("/resbody");
  expect(response.get("Content-Type")).toContain("text/html");
  expect(response.text).toBe(`<html><body><p>Hello World</p></body></html>`);
});
