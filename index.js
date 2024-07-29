// Loads .env file contents into process .env by default
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
require("./db/connection");
const blServer = express();

blServer.use(cors());
blServer.use(express.json());
blServer.use(router);

blServer.use("/uploads", express.static("./uploads"));
const PORT = 3000 || process.env.PORT;

blServer.listen(PORT, () => {
  console.log(`Easy Blog Server started at port : ${PORT}`);
});

blServer.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1 style="color:red;">Easy Blog Server Started,and waiting for client request.... !!!</h1>`
    );
});

blServer.post("/", (req, res) => {
  res.status(200).send("POST REQUEST");
});
