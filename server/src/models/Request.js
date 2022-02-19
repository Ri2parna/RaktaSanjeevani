const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  units: { type: Number, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, required: true },
  validity: { type: Date },
  location: {
    latitude: Number,
    longitude: Number,
  },
  cityName: { type: String, lowercase: true, trim: true, required: true },
  hospital: { type: String, trim: true, required: true },
  status: String,
});

const Request = mongoose.model("request", requestSchema);
module.exports = Request;
