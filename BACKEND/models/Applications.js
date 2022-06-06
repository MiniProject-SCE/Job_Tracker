const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationJobUserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
  },
  company: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  usernameUsed: {
    type: String,
    required: true,
  },
  pwdUsed: {
    type: String,
    required: true,
  },
  urlUsed: {
    type: String,
    required: true,
  },
  deadLine: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("application", ApplicationJobUserSchema);
