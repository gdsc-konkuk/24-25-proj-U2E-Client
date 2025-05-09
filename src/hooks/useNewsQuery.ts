import { useQuery } from "@tanstack/react-query";
import { fetchNewsContents, fetchRecentNews } from "../api/newsApi";

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

/**
 * 뉴스 ID를 통해 뉴스 본문을 조회하는 커스텀 훅
 * @param newsId 뉴스 ID
 * @returns 뉴스 상세 정보 쿼리 결과
 */
export const useNewsContentsQuery = (newsId: number) => {
  return useQuery({
    queryKey: ["newsContents", newsId],
    queryFn: () => fetchNewsContents(newsId),
    enabled: !!newsId,
  });
};
