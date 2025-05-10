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

export interface GetPinResponse {
  code: number;
  message: string;
  data: {
    pinList: PinData[];
  };
}

export interface LoginResponse {
  userId: number;
  token: string;
}
