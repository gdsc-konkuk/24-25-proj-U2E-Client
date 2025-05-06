import { useParams } from "react-router-dom";
import {
  useCommentsQuery,
  useCreateCommentMutation,
} from "../../hooks/useCommentsQuery";
import CommentCard from "./CommentCard";
import styled from "styled-components";

function Comments() {
  const newsId = useParams().newsId || 1;
  const { data, isLoading, error } = useCommentsQuery(newsId);
  const { mutate: createComment, error: createError } =
    useCreateCommentMutation();

  if (isLoading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>댓글을 불러오는 데 문제가 발생했습니다.</div>;

  const handleCreate = () => {
    createComment({
      userId: 123,
      userName: "천재",
      newsId: 1,
      contents: "새로운 댓글 내용입니다!",
    });
  };

  return (
    <Container>
      {data?.data.commentList.map((comment) => (
        <CommentCard key={comment.commentId} {...comment} />
      ))}

      <button onClick={handleCreate}>{"댓글 작성"}</button>
      {createError && <p>댓글 작성 중 오류가 발생했습니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  overflow-y: scroll;
  backdrop-filter: blur(5px);
  background-color: ${({ theme }) => theme.colors.background};
`;

export default Comments;
