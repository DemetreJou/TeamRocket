const express = require('express');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient()

const app = express();
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({message: "Basic distributed logging server"});
});

async function saveLog(log) {
  return prisma.log.create({
    data: {
      message: log.message,
      logLevel: log.level,
      timestamp: log.timestamp,
      machineId: log.machine_id,
    }
  })
}

app.post("/log", async (req, res) => {
  // TODO: add validation
  // console.log(req.body)
  await saveLog(req.body)
  res.status(201).json(req.body)
});

app.listen(PORT, () => {
  console.log(`log collection server running at http://localhost:${PORT}`);
});
module.exports = app;
