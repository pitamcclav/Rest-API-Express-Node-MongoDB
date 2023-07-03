if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// adding packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');


// middleware
app.use(bodyParser.json());
app.use(cors());


// routes initialization
const postRouter = require("./routes/posts");



// database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => console.log("we are connected to the database!"));

// using routes
app.use("/", postRouter);

// server
app.listen(3000);
