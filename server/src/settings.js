import dotenv from "dotenv";
import path from "path";

dotenv.config("./.env");

export const connectionString = process.env.connectionString;
export const connectionPort = process.env.PORT;
