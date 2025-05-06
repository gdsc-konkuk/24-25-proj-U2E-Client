import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, fetchComments } from "../api/commentApi";
import {
  CreateCommentResponse,
  DeleteCommentResponse,
} from "../types/response";
import { CreateCommentRequest } from "../types/request";

/**
 * 댓글 목록을 조회하기 위한 React Query 커스텀 훅
 * @param newsId 뉴스 ID
 * @returns 댓글 조회 쿼리 결과 객체
 */
export const useCommentsQuery = (newsId: number) => {
  return useQuery({
    queryKey: ["comments", newsId],
    queryFn: () => fetchComments(newsId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * 댓글 작성용 React Query 커스텀 훅
 * @returns {UseMutationResult<CreateCommentResponse, unknown, CreateCommentRequest>}
 */
export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateCommentResponse, Error, CreateCommentRequest>({
    mutationFn: (newComment) => createComment(newComment),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.newsId],
      });
    },
  });
};

/**
 * 댓글 삭제용 React Query 커스텀 훅
 * @returns 댓글 삭제 mutation 결과 객체
 */
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCommentResponse, Error, number>({
    mutationFn: (commentId: number) => deleteComment(commentId),

    onSuccess: (commentId) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", commentId],
      });
    },
  });
};
