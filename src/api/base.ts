import axios from "axios";

const BASE_URL = "url";

export const instance = axios.create({
  baseURL: BASE_URL,
});