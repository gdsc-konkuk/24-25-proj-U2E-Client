import { http, HttpResponse } from "msw";

const baseURL =
  import.meta.env.VITE_APP_NODE === "development"
    ? "https://test"
    : "https://us2earth.click/";

export const handlers = [
  http.get(`${baseURL}/comments/:newsId`, ({ params }) => {
    const { newsId } = params;

    if (newsId && parseInt(newsId.toString()) > 0) {
      return HttpResponse.json({
        code: 200,
        message: "OK",
        data: {
          commentList: [
            {
              userId: 1,
              commentId: 1,
              contents: "안녕하세요, 저는 댓글입니다.",
            },
            {
              userId: 2,
              commentId: 2,
              contents: "기후위기가 정말 심각하네요.",
            },
            {
              userId: 3,
              commentId: 3,
              contents: "우리 모두 아름다운 세상을 만들어나가요.",
            },
            {
              userId: 4,
              commentId: 4,
              contents: "기후위기 해결을 위해 모두가 함께 노력해야 합니다.",
            },
            {
              userId: 4,
              commentId: 5,
              contents: "일단 나부터.",
            },
          ],
        },
      });
    }

    return HttpResponse.json(
      {
        code: 3000,
        message:
          "비밀번호는 영어와 숫자를 포함해서 8자 이상 16자 이내로 입력해주세요.",
        timestamp: Date.now(),
      },
      { status: 400 }
    );
  }),
];
