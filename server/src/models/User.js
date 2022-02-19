const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  currentLocation: String,
  coords: {
    latitude: Number,
    longitude: Number,
  },
  bloodType: String,
  age: Number,
  lastDonated: Date,
  active: { type: Boolean, default: true },
  acceptedRequests: [{ rid: mongoose.Schema.Types.ObjectId }],
  incompleteRequests: [{ rid: mongoose.Schema.Types.ObjectId }],
  completedRequests: [{ rid: mongoose.Schema.Types.ObjectId }],
  createdRequests: [{ rid: mongoose.Schema.Types.ObjectId }],
  verified: { type: Boolean, default: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
