// create express app

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userSchema = mongoose.Schema({
  uuid: String,
  name: String,
});



mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Amine's example express app !" });
});

app.use("/users", require("./app/routes/user.route"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
