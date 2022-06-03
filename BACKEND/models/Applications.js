const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationJobUserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobtrackeruser",
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("application", ApplicationJobUserSchema);
