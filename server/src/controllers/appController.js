import AcceptedRequest from "../models/AcceptedRequest";
import Request from "../models/Request";
import User from "../models/User";

module.exports.createNewRequest = async (req, res) => {
  Request.create({
    patientName: req.body.patientName,
    bloodType: req.body.bloodType,
    units: req.body.units,
    from: req.body.from,
    validity: req.body.validity,
    location: req.body.location,
    hospital: req.body.hospital,
    cityName: req.body.cityName,
  })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      // handleError(err);
      console.log(err);
      res.status(401).json({
        errorMessage: "Could not store into database",
      });
    });
};

// remove request from accepted requests
module.exports.removeActiveRequest = async (req, res) => {
  const { acceptedBy, rid } = req.body;
  AcceptedRequest.find({ rid, acceptedBy })
    .deleteOne()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
};

//accept request
module.exports.acceptRequest = async (req, res) => {
  const { acceptedBy, rid } = req.body;
  AcceptedRequest.create({
    rid,
    acceptedBy,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.sendStatus(400);
    });
};

// reject requests after accepting them
module.exports.rejectRequest = async (req, res) => {
  const { uid, rid } = req.params;
  AcceptedRequest.findOneAndDelete({ rid })
    .then((data) => res.send(data))
    .catch(() => res.sendStatus(400));
};
// get list of acitve requests in a particular area
module.exports.getLocationwiseRequests = async (req, res) => {
  const { location } = req.params;
  Request.find({ cityName: location })
    .where("status")
    .exists(false)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(401).json({
        errorMessage: "Error while finding data from the database",
      });
    });
};
// get request details
module.exports.getRequestDetails = async (req, res) => {
  const { rid } = req.query;
  Request.findById(rid)
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(404));
};

// ** Donors

// get list of donors
// get donor list in a particular area
module.exports.getLocationwiseDonors = async (req, res) => {
  const { location } = req.params;
  User.find({ currentLocation: location })
    .then((data) => res.send(data))
    .catch((err) => {
      // handleError(err)
      res.status(401).json({
        errorMessage: "Unable to query locationwise donor list",
      });
    });
};

// update donor details
module.exports.updateUserDetails = async (req, res) => {
  // TODO : Authorization check required i.e. user 1 changing details of user2
  const { uid, currentLocation, coords } = req.body;
  User.findByIdAndUpdate(uid, { currentLocation, coords })
    .then((data) => res.sendStatus(200))
    .catch((err) => res.sendStatus(400));
};

// get donor details
module.exports.getUserDetails = async (req, res) => {
  // TODO: Not all data can be seen by everyone, need a check for that
  const { uid } = req.query;
  User.findById(uid)
    .then((data) => res.send(data))
    .catch(() => res.sendStatus(400));
};

// get all registered donors
module.exports.getAllDonors = async (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.sendStatus(400));
};

// * counts

// get count of requests
module.exports.getRequestCount = async (req, res) => {
  let count = await Request.find().countDocuments();
  res.json({ count });
};
// get request count by location
module.exports.getRequestCountByLocation = async (req, res) => {
  const { location } = req.params;
  Request.countDocuments({ cityName: location })
    .then((count) => res.json({ count }))
    .catch((err) => res.sendStatus(404));
};

// get count of active donors
module.exports.getActiveDonorCount = async (req, res) => {
  // let count = await User.find().where("status").exists().countDocuments();
  let count = await User.find().countDocuments();
  res.json({ count });
};
