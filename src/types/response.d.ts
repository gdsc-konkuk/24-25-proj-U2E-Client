export interface CommentResponse {
  code: number;
  message: string;
  data: {
    commentList: {
      userId: number;
      userName: string;
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

interface DeleteCommentResponse {
  code: number;
  message: string;
  data: {
    commentId: number;
  };
}
