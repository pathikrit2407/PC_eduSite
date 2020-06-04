const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name of the student"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide your email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  passwordConfirm: {
    type: String,
  },
  contact: {
    type: Number,
  },
  fatherName: {
    type: String,
    trim: true,
  },
  motherName: {
    type: String,
    trim: true,
  },
  batch: {
    type: String,
  },
  performances: {
    //
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
