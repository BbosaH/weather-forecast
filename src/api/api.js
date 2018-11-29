import axios from "axios";

export const API_AUTH_ID = "41ce8d6eb53e1633f9aeaeda6a814d6a";
export const ZIP_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;

const API = axios.create({
  baseURL: `http://api.openweathermap.org/data/2.5/`
});

export default API;
