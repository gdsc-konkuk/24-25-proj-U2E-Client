import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/commentApi";

/**
 * 댓글 목록을 조회하기 위한 React Query 커스텀 훅
 * @param newsId 뉴스 ID
 * @returns 댓글 조회 쿼리 결과 객체
 */
export const useCommentsQuery = (newsId: string | number) => {
  return useQuery({
    queryKey: ["comments", newsId],
    queryFn: () => fetchComments(newsId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
