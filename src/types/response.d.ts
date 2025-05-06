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

export interface CreateCommentResponse {
  code: number;
  message: string;
  data: {
    userId: number;
  };
}
