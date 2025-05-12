import { CommentResponse, CreateCommentResponse } from "../types/response";
import { CreateCommentRequest } from "../types/request";
import apiClient from "./client";

/**
 * 특정 뉴스의 댓글 목록을 조회하는 API
 * @param newsId 뉴스 ID
 * @returns 댓글 목록
 */
export const fetchComments = async (newsId: number) => {
  const response = await apiClient.get<CommentResponse>(`/comments/${newsId}`);
  return response.data;
};

/**
 * 댓글 작성 API
 * @param params 댓글 작성에 필요한 파라미터 (userId, newsId, contents)
 * @returns 작성된 댓글 정보
 */
export const createComment = async ({
  userId,
  newsId,
  contents,
}: CreateCommentRequest) => {
  const response = await apiClient.post<CreateCommentResponse>(
    `/comments/${newsId}`,
    {
      userId,
      newsId,
      contents,
    }
  );
  return response.data;
};

/**
 * 댓글 삭제 API
 * @param commentId 삭제할 댓글 ID
 * @returns 삭제된 댓글 ID를 포함한 응답
 */
export const deleteComment = async (commentId: number) => {
  const response = await apiClient.delete<{
    code: number;
    message: string;
    data: { commentId: number };
  }>(`/comments/${commentId}`);
  return response.data;
};
