const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
const session = require("express-session");
dotenv.config();

loginCheck(passport);

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "soldier boy",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server don start for port: " + PORT));
