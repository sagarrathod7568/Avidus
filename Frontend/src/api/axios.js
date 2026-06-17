import axios from "axios";

let setGlobalLoading = () => {};

export const setLoaderHandler = (handler) => {
  setGlobalLoading = handler;
};

const API = axios.create({
  baseURL: "https://avidus-86pc.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {
    setGlobalLoading(true);

    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    setGlobalLoading(false);
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    return response;
  },
  (error) => {
    setGlobalLoading(false);
    return Promise.reject(error);
  },
);

export default API;
