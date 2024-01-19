const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  topic: {
    type: String,
  },
  severity: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "agent" },
  status: {
    type: String,
    enum: ["New", "Assigned", "Resolved"],
    default: "New",
  },
  resolvedOn: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports.ticketModel = new mongoose.model("ticket", ticketSchema);
