import axios from "axios";
import Cookies from "universal-cookie";
axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL = "https://kaaryar.hossein.codes/";
axios.defaults.baseURL = "https://kaaryardev.hossein.codes/";
// axios.defaults.withCredentials = true;

export const userLogin = axios.create({
  method: "POST",
  timeout: 5000,
  // withCredentials: false,
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

const cookie = new Cookies();

getData.interceptors.request.use(
  (request) => {
    request.headers.common["Authorization"] = cookie.get("token");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

postData.interceptors.request.use(
  (request) => {
    request.headers.common["Authorization"] = cookie.get("token");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
editAxios.interceptors.request.use(
  (request) => {
    request.headers.common["Authorization"] = cookie.get("token");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
removeData.interceptors.request.use(
  (request) => {
    request.headers.common["Authorization"] = cookie.get("token");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetcherGet = (url) => getData(url).then((res) => res.data);
