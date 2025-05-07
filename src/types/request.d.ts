export interface CreateCommentRequest {
  userId: number;
  userName: string;
  newsId: number;
  contents: string;
}

export interface DeleteCommentParams {
  commentId: number;
  newsId: number;
}
