export interface APIResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface CommentItem {
  userId: number;
  name: string;
  commentId: number;
  contents: string;
}

export interface PinResponse {
  code: number;
  message: string;
  data: {
    pinList: Pin[];
  };
}

export type CommentListResponse = APIResponse<{ commentList: CommentItem[] }>;

export type CreateCommentResponse = APIResponse<{ userId: number }>;

export type DeleteCommentResponse = APIResponse<{ commentId: number }>;

export type RecentNewsResponse = APIResponse<{ latelyNewsList: RecentNews[] }>;

export type NewsResponse = APIResponse<News>;

export type fetchPinList = APIResponse<{ pinList: Pin[] }>;

export type LoginResponse = APIResponse<{ userId: number; token: string }>;

