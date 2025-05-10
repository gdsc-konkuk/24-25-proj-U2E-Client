export interface CreateCommentRequest {
  userName: string;
  newsId: number;
  contents: string;
}

export interface DeleteCommentParams {
  commentId: number;
  newsId: number;
}

export interface LoginRequest {
  name: string;
  password: string;
}
