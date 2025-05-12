import {
  CommentListResponse,
  CreateCommentResponse,
  DeleteCommentResponse,
} from "../types/response";
import { CreateCommentRequest } from "../types/request";
import apiClient from "./client";

/**
 * 특정 뉴스의 댓글 목록을 조회하는 API
 * @param newsId 뉴스 ID
 * @returns 댓글 목록
 */
export const fetchComments = async (newsId: number) => {
  const response = await apiClient.get<CommentListResponse>(
    `/comments/${newsId}`
  );
  return response.data;
};

/**
 * 댓글 작성 API
 * @param params 댓글 작성에 필요한 파라미터 (userName, newsId, contents)
 * @returns 작성된 댓글 정보
 */
export const createComment = async ({
  userName,
  newsId,
  contents,
}: CreateCommentRequest) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const response = await apiClient.post<CreateCommentResponse>(
    `https://us2earth.click/comments?username=${encodeURIComponent(userName)}`,
    {
      newsId,
      contents,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const response = await apiClient.delete<DeleteCommentResponse>(
    `/comments/${commentId}`
  );
  return response.data;
};
