const express = require("express");
const app = express();
const config = require("./environment");
const PORT = process.env.PORT || 3001;
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

app.get("/", (req, res) => {
  res.send("Dummy Webapp for creating logs");
});

// This function gets called by the other log_creator
app.get("/current_time", (req, res) => {
  const request_id = req.query["request_id"];
  let date = new Date();
  date.toISOString();
  // TODO: send request to logging server
  res.send(date);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

server = app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

function createLog() {
  const request_id = uuidv4();
  axios
    .get(config.webapp.send_to_url + "current_time", {
      params: {
        request_id: request_id
      }
    })
    .then(function(response) {
      // TODO: send request to logging server
      // console.log("success");
    })
    .catch(function(error) {
      // TODO: send result to logging server
      // console.log("fail");
    });
}

const _ = setInterval(createLog, 3000);

module.exports = { server: server, app: app };
