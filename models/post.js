const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addMissingSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    lastSeenLocation: {
      type: String,
      require: true,
    },
    dateLastSeen: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    contactName: {
      type: String,
      require: true,
    },
    contactNumber: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Misissing", addMissingSchema);
