const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const methodOverride = require("method-override");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const auth_config = require("./config/auth_config");
const expressLayouts = require("express-ejs-layouts");
const { check, validationResult } = require("express-validator");
const indexRoutes = require("./routes/index");
const studentRoutes = require("./routes/student");

const app = express();

//Database config===================================
const url = "mongodb://localhost:27017/PC";
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("connected");
  }
);

//App config=======================================
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

auth_config(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Routes===========================================

app.use("/student", studentRoutes);

//Application listen at port 8080
var port = 8080 || process.env.PORT;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server started at port 8080");
});
