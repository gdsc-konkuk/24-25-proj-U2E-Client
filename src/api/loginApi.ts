import { LoginReturn } from "../types/login";
import { LoginRequest } from "../types/request";
import { LoginResponse } from "../types/response";
import apiClient from "./client";

/**
 * @description 로그인 API
 * @param loginData 로그인 요청 데이터
 * @returns 로그인 성공 시 사용자 정보와 토큰을 포함한 객체
 * @throws 로그인 실패 시 에러 메시지
 */
export const login = async (loginData: LoginRequest): Promise<LoginReturn> => {
  const response = await apiClient.post<LoginResponse>(
    "https://us2earth.click/user/login",
    loginData
  );
  if (!response.data.success) {
    throw new Error(response.data.message || "Login failed.");
  }

  return {
    userId: response.data.data.userId,
    token: response.data.data.token,
    name: loginData.name,
  };
};
