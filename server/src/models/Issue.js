const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 5,
    max: 100,
    required: true
  },
  description: {
    type: String,
    min: 5,
    required: true
  },
  state: {
    type: String,
    enum: ["open", "pending", "closed"],
    default: "open"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Issue", issueSchema);