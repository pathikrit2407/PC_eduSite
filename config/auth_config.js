const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Student = require("../models/student");
module.exports = function (passport) {
  passport.use(
    "student_auth",
    new LocalStrategy(function (username, password, done) {
      // Match Username
      let query = { username: username };
      Student.findOne(query, function (err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "Username is incorrect" });
        }

        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Student.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
