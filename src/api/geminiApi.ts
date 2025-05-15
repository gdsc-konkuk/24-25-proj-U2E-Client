import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types/response";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const getSolutionWithGemma = async (newsContents: string): Promise<string> => {
  const model = ai.models.generateContent({
    model: "gemma-3-27b-it",
    contents: `
      You are a news-analysis assistant. 

      INPUT:
        - The provided text contains a news article.

      TASK:
        - Read the article and think of a concise "solution"—that is, a clear recommendation, next action, or summary of how to address the issues described.
        - Be practical, specific, and actionable in your recommendation.
        - Keep your solution concise (3-4 sentences).

      Based on the following article text, provide ONLY your solution recommendation:

      \`\`\`
      ${newsContents}
      \`\`\`
    `,
  });

  const response = await model;
  return response.text?.trim() || "No solution found.";
};

const getRelatedNewsWithGemini = async (
  newsContents: string
): Promise<string[]> => {
  const model = ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
      You are a news-analysis assistant. 

      INPUT:
        - The provided text contains a news article.

      TASK:
        - Identify up to 3 existing, real-world news URLs that are directly related to the topic of this article.
        - These should be valid links (e.g. starting with https://) to reputable news sources.

      OUTPUT FORMAT (strict JSON, no additional keys or prose):
      \`\`\`json
      {
        "relatedNews": [             // array of up to 3 URL strings
          "https://…",
          "https://…"
        ]
      }
      \`\`\`

      Now produce only the JSON object described above with the field "relatedNews", based on the following article text:

      \`\`\`
      ${newsContents}
      \`\`\`
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          relatedNews: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
              description:
                "List of up to 3 real news URLs related to the topic",
            },
          },
        },
        required: ["relatedNews"],
      },
    },
  });

  const response = await model;
  const parsedResponse = JSON.parse(response.text || '{"relatedNews":[]}');
  return parsedResponse.relatedNews || [];
};

export const getGeminiSolution = async (
  newsContents: string
): Promise<GeminiResponse> => {
  try {
    const [solution, relatedNews] = await Promise.all([
      getSolutionWithGemma(newsContents),
      getRelatedNewsWithGemini(newsContents),
    ]);

    return {
      solution,
      relatedNews,
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      solution: "Error retrieving solution",
      relatedNews: [],
    };
  }
};
