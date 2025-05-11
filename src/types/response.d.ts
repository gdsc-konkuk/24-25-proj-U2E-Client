export interface CommentResponse {
  code: number;
  message: string;
  data: {
    commentList: {
      userId: number;
      name: string;
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

interface RecentNewsResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    latelyNewsList: RecentNews[];
  };
}

interface NewsResponse {
  success: boolean;
  code: number;
  message: string;
  data: News;
}

export interface PinResponse {
  code: number;
  message: string;
  data: {
    pinList: Pin[];
  };
}
