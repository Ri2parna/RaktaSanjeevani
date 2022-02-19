import { Router } from "express";
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/registration", authController.registrationStatus);
authRouter.post("/registration", authController.RegisterNewUser);

module.exports = authRouter;
