import { useCommentsQuery } from "../../hooks/useCommentsQuery";

interface CommentsProps {
  newsId: string | number;
}

function Comments({ newsId = "1" }: CommentsProps) {
  const { data, isLoading, error } = useCommentsQuery(newsId);

  if (isLoading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>댓글을 불러오는 데 문제가 발생했습니다.</div>;

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
    </div>
  );
}

export default Comments;
