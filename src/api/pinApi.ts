import { PinResponse } from "../types/response";
import apiClient from "./client";

export const fetchPinList = async ({
  region,
  climate,
}: {
  region?: string | null;
  climate?: string | null;
}) => {
  const params: Record<string, string> = {};
  if (region) params.region = region;
  if (climate) params.climate = climate;

  const response = await apiClient.get<PinResponse>("/pin", { params });
  return response.data.data.pinList;
};
