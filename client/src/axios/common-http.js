import axios from "axios";

const commonAxios = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-type": "application/json"
  }
});

export default commonAxios