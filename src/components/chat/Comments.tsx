import {
  useCommentsQuery,
  useCreateCommentMutation,
} from "../../hooks/useCommentsQuery";

interface CommentsProps {
  newsId: number;
}

function Comments({ newsId = 1 }: CommentsProps) {
  const { data, isLoading, error } = useCommentsQuery(newsId);
  const { mutate: createComment, error: createError } =
    useCreateCommentMutation();

  if (isLoading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>댓글을 불러오는 데 문제가 발생했습니다.</div>;

  const handleCreate = () => {
    createComment({
      userId: -123,
      newsId: -1,
      contents: "새로운 댓글 내용입니다!",
    });
  };

  return (
    <div>
      <ul>
        {data?.data.commentList.map((comment) => (
          <li key={comment.commentId}>
            <p>
              사용자 {comment.userId}: {comment.contents}
            </p>
          </li>
        ))}
      </ul>

      <button onClick={handleCreate}>{"댓글 작성"}</button>
      {createError && <p>댓글 작성 중 오류가 발생했습니다.</p>}
    </div>
  );
}

export default Comments;
