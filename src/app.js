import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

app.get("/tutuplapak/search/", (req, res) => {
  const { path, originalUrl, hostname, protocol, secure } = req;
  res.json({
    path,
    originalUrl,
    hostname,
    protocol,
    secure,
  });
});

app.get("/warungpedia/search", (req, res) => {
  res.send(`Result: ${req.query.q} City: ${req.query.city}`);
});

app.get("/header", (req, res) => {
  const type = req.get("accept");
  res.send(`type: ${type}`);
});

app.listen(3000, () => {
  console.info("Server started on port 3000");
});

export default app;
