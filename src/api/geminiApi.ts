import {GoogleGenAI,Type } from '@google/genai';
import { GeminiResponse } from '../types/response';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export const getGeminiSolution = async (newsContents: string): Promise<GeminiResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `
You are a news-analysis assistant. 

INPUT:
  - The variable \`newsContents\` contains the full text of a news article.

TASK:
  1. Read the article and think of a concise "solution"—that is, a clear recommendation, next action, or summary of how to address the issues described.
  2. Identify up to 3 existing, real-world news URLs that are directly related to the topic of this article. These should be valid links (e.g. starting with https://) to reputable news sources.

OUTPUT FORMAT (strict JSON, no additional keys or prose):
\`\`\`json
{
  "solution": "…",             // recommendation or summary
  "relatedNews": [             // array of up to 3 URL strings
    "https://…",
    "https://…"
  ]
}
\`\`\`

Now produce only the JSON object described above, with the field “solution” and “relatedNews”, based on the following article text:

\`\`\`
${newsContents}
\`\`\`
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          solution: {
            type: Type.STRING,
            description: "Concise recommendation or next-action based on the article",
          },
          relatedNews: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
              description: "List of up to 3 real news URLs related to the topic",
            },
          },
        },
        required: ["solution", "relatedNews"],
      },
    },
  });
  const parsedResponse = JSON.parse(response.text || "[]") 
  return parsedResponse;
};

