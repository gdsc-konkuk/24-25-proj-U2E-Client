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

export type CommentListResponse = APIResponse<{ commentList: CommentItem[] }>;

export type CreateCommentResponse = APIResponse<{ userId: number }>;

export type DeleteCommentResponse = APIResponse<{ commentId: number }>;

export type RecentNewsResponse = APIResponse<{ latelyNewsList: RecentNews[] }>;

export type NewsResponse = APIResponse<News>;

export interface PinData {
  pinId: number;
  latitude: number;
  longitude: number;
  pinColor: string;
  region: string;
  climate:
    | "TEMPERATURE_RISE"
    | "HEAVY_RAIN_OR_FLOOD"
    | "FINE_DUST"
    | "DROUGHT_OR_DESERTIFICATION"
    | "SEA_LEVEL_RISE"
    | "TYPHOON_OR_TORNADO"
    | "WILDFIRE"
    | "EARTHQUAKE"
    | "DEFORESTATION"
    | "BIODIVERSITY_LOSS";
}

export type GetPinResponse = APIResponse<{ pinList: PinData[] }>;

export type LoginResponse = APIResponse<{ userId: number; token: string }>;

interface GeminiResponse {
  solution: string;
  relatedNews: string[];
}