const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connect = require("./config/db");
const authRoute = require("./routes/authRoute");

dotenv.config();

connect();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>welcome to ecommerce app</h1>");
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`.bgMagenta.white);
});
