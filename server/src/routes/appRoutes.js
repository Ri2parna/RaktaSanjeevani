import { Router } from "express";
const appController = require("../controllers/appController");

const appRouter = Router();

appRouter.get("/request", appController.getRequestDetails);
appRouter.post("/request", appController.createNewRequest);
appRouter.delete("/request", appController.removeActiveRequest);

appRouter.get("/request/:location", appController.getLocationwiseRequests);
appRouter.get("/donors/:location", appController.getLocationwiseDonors);
// * Change the query type to get actual active donors
appRouter.get("/donorcount", appController.getActiveDonorCount);
appRouter.get("/requestcount", appController.getRequestCount);
appRouter.get(
  "/requestcount/:location",
  appController.getRequestCountByLocation
);
appRouter.post("/user", appController.updateUserDetails);
appRouter.get("/user", appController.getUserDetails);

// Admin endpoints are:
// GET /request => get all blood requests in the platform
// get all blood donors in the platform

appRouter.get("/donors", appController.getAllDonors);
appRouter.post("/acceptrequest", appController.acceptRequest);
module.exports = appRouter;
