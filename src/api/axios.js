import axios from "axios";


axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://api.pm.kaaryar.ir/";

export const userLogin = axios.create({
  method: "POST",
  timeout: 3000,
});

export const getData = axios.create({
  method: "GET",
});

export const postData = axios.create({
  method: "POST",
});

export const removeData = axios.create({
  method: "DELETE",
});
export const editAxios = axios.create({
  method: "PUT",
});

getData.interceptors.request.use(
  (request) => {
    const data = window.localStorage.getItem("user");
    const resp = JSON.parse(data);
    request.headers.common["Authorization"] = resp.token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

postData.interceptors.request.use(
  (request) => {
    const data = window.localStorage.getItem("user");
    const resp = JSON.parse(data);
    request.headers.common["Authorization"] = resp.token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
editAxios.interceptors.request.use(
  (request) => {
    const data = window.localStorage.getItem("user");
    const resp = JSON.parse(data);
    request.headers.common["Authorization"] = resp.token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
removeData.interceptors.request.use(
  (request) => {
    const data = window.localStorage.getItem("user");
    const resp = JSON.parse(data);
    request.headers.common["Authorization"] = resp.token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
