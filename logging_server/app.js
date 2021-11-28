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

app.get("/logs/search", async (req, res) => {
  // Returns all the log messages
  const logs = await prisma.log.findMany()
  res.json(logs)
});

// get all logs from a specific machine
app.get("/logs/search/machine_id", async (req, res) => {
  if(!req.query.machine_id) {
    res.status(400).json({message: "machine_id is required"})
  }
  const logs = await prisma.log.findMany({
    where: {
      machineId: req.query.machine_id
    }
  })
  res.json(logs)
});

app.get("/logs/search/time_period", async (req, res) => {
  const from_exists = req.query.from.length > 0
  const to_exists = req.query.from.length > 0
  if (from_exists !== to_exists) {
    res.status(400).json({message: "from and to must both be present or neither to be present"})
  }
  const logs = await prisma.log.findMany({
    where: {
      timestamp: {
        gte: req.query.from,
        lte: req.query.to
      }
    }
  })
  res.json(logs)
});

app.get("/logs/search/message", async (req, res) => {
  const logs = await prisma.log.findMany({
    where: {
      message: {
        contains: req.query.message
      }
    }
  })
  res.json(logs)
});

app.listen(PORT, () => {
  console.log(`log collection server running at http://localhost:${PORT}`);
});
module.exports = app;
