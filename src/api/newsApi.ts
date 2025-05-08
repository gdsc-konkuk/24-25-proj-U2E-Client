import axios from "axios";
import { NewsResponse } from "../types/response";

/**
 * 최근 뉴스 목록을 조회하는 API
 * @returns 최근 뉴스 목록
 */
export const fetchRecentNews = async () => {
  const response = await axios.get<NewsResponse>(
    `https://us2earth.click/news/lately`
  );
  return response.data;
};
