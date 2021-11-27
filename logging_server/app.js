const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient()

app.get("/", (req, res) => {
  res.json({ message: "Basic distributed logging server" });
});

app.post("/log", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
module.exports = app;
