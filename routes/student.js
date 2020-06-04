const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("connect-flash");
const saltRounds = 10;
const { check, validationResult } = require("express-validator");

router.get("/register", ifAuthenticated, (req, res) => {
  res.render("student_register");
});

router.post(
  "/register",
  ifAuthenticated,
  [
    check("name", "Name is required").not().isEmpty(),
    check("contact_number", "Contact Number is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Provide a proper email").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("student_register", { errors: errors.array() });
    } else {
      var newStudent = new Student();
      newStudent.name = req.body.name;
      newStudent.username = req.body.username;
      newStudent.email = req.body.email;
      newStudent.contact = req.body.contact;
      newStudent.password = req.body.password;
      newStudent.passwordConfirm = req.body.passwordConfirm;
      newStudent.fatherName = req.body.fatherName;
      newStudent.motherName = req.body.motherName;
      newStudent.batch = req.body.batch;

      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
          return;
        } else {
          newStudent.password = hash;
          newStudent.passwordConfirm = hash;
          newStudent.save(function (err) {
            if (err) {
              console.log(err);
              return;
            } else {
              req.flash("success", "You have registered, log in now!");
              res.redirect("/student/login");
            }
          });
        }
      });
    }
  }
);

router.get("/login", ifAuthenticated, (req, res) => {
  res.render("student_login");
});

router.post(
  "/login",
  passport.authenticate("student_auth", {
    successRedirect: "/student/dashboard",
    failureRedirect: "/student/login",
    failureFlash: true,
  })
);

router.get("/dashboard", ensureIsAuthenticated, (req, res) => {
  res.render("student_dashboard");
});

router.get("/logout", function (req, res) {
  req.logout();

  res.redirect("/student/login");
});

function ensureIsAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please sign in first");
    res.redirect("/student/login");
  }
}

function ifAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash("info", "You are already logged in");
    res.redirect("/student/dashboard");
  } else {
    return next();
  }
}

module.exports = router;
