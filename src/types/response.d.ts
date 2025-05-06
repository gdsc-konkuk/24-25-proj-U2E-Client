export interface CommentResponse {
  code: number;
  message: string;
  data: {
    commentList: {
      userId: number;
      commentId: number;
      contents: string;
    }[];
  };
}
