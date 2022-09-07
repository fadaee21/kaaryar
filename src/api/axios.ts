import axios from "axios";

let headersList = {
  "Content-Type": "application/json",
  Authorization: "Basic dXNlcnRlc3RzcHJpbmc6dXNlcnRlc3RzcHJpbmc=",
};

export default axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/",
  baseURL: "https://api.pm.kaaryar.ir",
  headers: headersList,
});
