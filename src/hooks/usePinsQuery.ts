// src/hooks/usePinQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPinList } from "../api/pinApi";
import { PinResponse } from "../types/response";

/**
 * pin 목록을 조회하기 위한 React Query 커스텀 훅
 * @returns 핀 조회 쿼리 결과 객체
 */
export const usePinQuery = () => {
  return useQuery<PinResponse[]>({
    queryKey: ["pins"],
    queryFn: fetchPinList,
    staleTime: 1000 * 60 * 500,
  });
};
