import User from "../models/User";

// the following endpoint returns a 200 OK status when the user is
// previously registered
module.exports.registrationStatus = async (req, res) => {
  const { phone } = req.query;
  User.findOne({ phone }).then((data) => {
    if (data == null) {
      // is not previously registered
      res.status(200).json(false);
    } else {
      res.status(400).json({ uid: data._id });
    }
  });
};

// the following endpoint registers a new user
module.exports.RegisterNewUser = async (req, res) => {
  await User.create({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    bloodType: req.body.bloodType,
    pincode: req.body.pincode,
    currentLocation: req.body.currentLocation,
  })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      const errorMessage = handleError(err);
      res.status(401).json(errorMessage);
    });
};

function handleError(err) {
  if (err.code == 11000) {
    return { errorMessage: "Duplicate data found" };
  }
}
