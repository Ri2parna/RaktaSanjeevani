const mongoose = require("mongoose");
import Request from "./Request";
import User from "./User";

const AcceptedRequestSchema = new mongoose.Schema({
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  acceptedDate: {
    type: Date,
    default: Date.now(),
  },
  acceptedBy: mongoose.Schema.Types.ObjectId,
});
// change requst status to accepted
AcceptedRequestSchema.pre("save", async function (next) {
  await Request.findByIdAndUpdate(this.rid, { status: "accepted" });
  next();
});

// add to user's field named accepted requests
AcceptedRequestSchema.post("save", async function (next) {
  await User.findByIdAndUpdate(this.acceptedBy, {
    $push: { acceptedRequests: { rid: this.rid } },
  });
});

// change status to rejected
AcceptedRequestSchema.pre("deleteOne", { model: true }, async function (next) {
  const { rid, acceptedBy } = this._conditions;
  await Request.findByIdAndUpdate(rid, { status: "rejected" });
  next();
});

// remove from user's field named accepted requests
AcceptedRequestSchema.post("deleteOne", async function (next) {
  const { acceptedBy, rid } = this._conditions;
  User.findByIdAndUpdate(acceptedBy, {
    $pull: { acceptedRequests: { rid } },
  });
});

const AcceptedRequest = mongoose.model(
  "acceptedrequest",
  AcceptedRequestSchema
);
module.exports = AcceptedRequest;
