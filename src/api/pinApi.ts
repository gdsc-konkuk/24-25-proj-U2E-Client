// src/api/pinApi.ts
import axios from "axios";
import { PinResponse } from "../types/response";
import apiClient from "./client";

// export const fetchPinList = async () => {
//   const response = await apiClient.get<GetPinResponse>("/pin");
//   return response.data.data.pinList;
// };
export const fetchPinList = async () => {
  const response = await axios.get<PinResponse>(`https://us2earth.click/pin`);
  console.log("response", response);
  return response.data.data.pinList;
};
