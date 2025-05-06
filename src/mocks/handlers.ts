// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

const API_URL = "https://test";

export const handlers = [
  http.get(`${API_URL}/comments/`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      name: "이성종",
    });
  }),
];
