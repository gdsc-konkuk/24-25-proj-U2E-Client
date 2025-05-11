import { http, HttpResponse } from "msw";
import { CreateCommentRequest } from "../types/request";

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/comments/:newsId`, ({ params }) => {
    const { newsId } = params;

    if (newsId && parseInt(newsId.toString()) > 0) {
      return HttpResponse.json({
        code: 200,
        message: "OK",
        data: {
          commentList: [
            {
              userId: 1,
              userName: "사용자1",
              commentId: 1,
              contents: "안녕하세요, 저는 댓글입니다.",
            },
            {
              userId: 2,
              userName: "사용자2",
              commentId: 2,
              contents:
                "기후위기가 정말 심각하네요. 오늘부터 분리수거 열심히 해야겠어요.",
            },
            {
              userId: 3,
              userName: "사용자3",
              commentId: 3,
              contents: "우리 모두 아름다운 세상을 만들어나가요.",
            },
            {
              userId: 4,
              userName: "사용자4",
              commentId: 4,
              contents:
                "기후위기 해결을 위해 모두가 함께 노력해야 합니다. 지금 이럴 때가 아닙니다. 모두들 분리수거 동참합시다.",
            },
            {
              userId: 4,
              userName: "사용자4",
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

  http.post(
    `${import.meta.env.VITE_API_URL}/comments/:newsId`,
    async ({ params, request }) => {
      const { newsId } = params;
      const body = (await request.json()) as CreateCommentRequest;

      if (newsId && Number(newsId) > 0) {
        return HttpResponse.json({
          code: 200,
          message: "OK",
          data: {
            userName: body?.userName,
          },
        });
      }

      return HttpResponse.json(
        {
          code: 3000,
          message: "Failed to create comment.",
          timestamp: 1735805809539,
        },
        { status: 400 }
      );
    }
  ),

  http.delete(
    `${import.meta.env.VITE_API_URL}/comments/:commentId`,
    ({ params }) => {
      const { commentId } = params;

      if (commentId && parseInt(commentId.toString()) > 0) {
        return HttpResponse.json({
          code: 200,
          message: "OK",
          data: {
            commentId: parseInt(commentId.toString()),
          },
        });
      }

      return HttpResponse.json(
        {
          code: 3000,
          message: "댓글을 찾을 수 없습니다.",
          timestamp: 1735805809539,
        },
        { status: 400 }
      );
    }
  ),
];
