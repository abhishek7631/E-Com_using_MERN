const mongoose = require("mongoose");

const colors = require("colors");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database is connected".bgGreen.white);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
