// const BASE_URL = "https://pure-coast-81586.herokuapp.com/api";

// const LOGIN_URL = BASE_URL + "/login";
// const REGISTER_URL = BASE_URL + "/register";

// const LOCATION_URL = BASE_URL + "/location/update";
// const LOCATION_UPDATE_URL = BASE_URL + "/location/update/status";
// const ACCEPT_BLOOD_URL = BASE_URL + "/blood/request/accept";
// const REJECT_BLOOD_URL = BASE_URL + "/blood/request/reject";

import { create } from "apisauce";

const api = create({
  baseURL: "http://9e012dd47f4a.ngrok.io",
});

module.exports = { api };
