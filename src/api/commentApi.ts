import { CommentResponse } from "../types/response";
import apiClient from "./client";

/**
 * 특정 뉴스의 댓글 목록을 조회하는 API
 * @param newsId 뉴스 ID
 * @returns 댓글 목록
 */
export const fetchComments = async (newsId: string | number) => {
  const response = await apiClient.get<CommentResponse>(`/comments/${newsId}`);
  return response.data;
};
