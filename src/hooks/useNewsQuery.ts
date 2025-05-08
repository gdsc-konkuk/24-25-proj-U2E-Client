import { useQuery } from "@tanstack/react-query";
import { fetchRecentNews } from "../api/newsApi";

/**
 * 최근 뉴스 목록을 조회하는 커스텀 훅
 * @returns 최근 뉴스 목록 쿼리 결과
 */
export const useRecentNewsQuery = () => {
  return useQuery({
    queryKey: ["recentNews"],
    queryFn: fetchRecentNews,
  });
};
