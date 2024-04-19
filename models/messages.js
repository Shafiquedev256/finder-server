const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oldMessageSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: String, required: true },
    room: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("oldMessagesInFinder", oldMessageSchema);
