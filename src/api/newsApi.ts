import { RecentNewsResponse, NewsResponse } from "../types/response";
import apiClient from "./client";

/**
 * @description 최근 뉴스 목록을 조회하는 API
 * @returns 최근 뉴스 목록
 */
export const fetchRecentNews = async () => {
  const response = await apiClient.get<RecentNewsResponse>(`/news/lately`);
  return response.data;
};

/**
 *
 * @param newsId 뉴스 ID
 * @description 뉴스 ID를 통해 뉴스 본문을 조회하는 API
 * @returns 뉴스 상세 정보
 */
export const fetchNewsContents = async (newsId: number) => {
  const response = await apiClient.get<NewsResponse>(`/news/${newsId}`);
  return response.data;
};
