const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>welcome to ecommerce app</h1>");
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`.bgMagenta.white);
});
