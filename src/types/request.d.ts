export interface CreateCommentRequest {
  userId: number;
  userName: string;
  newsId: number;
  contents: string;
}
