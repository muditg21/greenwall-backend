import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getTestMessage = async () => {
  const res = await axios.get(BASE_URL + "/api/test");
  return res.data;
};
