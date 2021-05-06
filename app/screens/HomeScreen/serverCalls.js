import axios from "axios";
import { api } from "../../config/endpoints";

// update location on server
export const sendLocationToServer = async (cname, uid, location) => {
  api
    .post("/user", { uid, currentLocation: cname, coords: location })
    .then((response) => {
      if (response.ok) return true;
      else return false;
    });
};
