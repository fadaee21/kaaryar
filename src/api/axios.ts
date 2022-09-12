import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.baseURL = "https://api.pm.kaaryar.ir";

export const userLogin = axios.create({
  method: "POST",
  timeout: 2000,
});

export const getData = axios.create({
  method: "GET",
});
