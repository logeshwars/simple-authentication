import axios from "axios";

const instance = axios.create({ baseURL: "" });
instance.defaults.proxy = true;
instance.defaults.headers = { "Access-Control-Allow-Credentials": true };
export default instance;

instance.interceptors.request.use((config) => {
  return config;
});
instance.interceptors.response.use((res) => {
  return res;
});
export const loginRequest = async (data) => {
  return await instance.post("user/login", data);
};
export const registerRequest = async (data) => {
  return await instance.post("user/register", data);
};
export const getData = async (data = 0) => {
  console.log("lastpage", data);
  return await instance.get(`user?_limit=6&_page=${data}`);
};
export const generateToken = async (data) => {
  return await instance.get("user/token");
};
export const logoutRequest = async (data) => {
  return await instance.get("user/logout");
};
