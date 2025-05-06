import { useParams } from "react-router-dom";
import { useCommentsQuery } from "../../hooks/useCommentsQuery";
import CommentCard from "./CommentCard";
import styled from "styled-components";

function Comments() {
  const newsId = Number(useParams().newsId) || 1;
  const { data, isLoading, error } = useCommentsQuery(newsId);

  if (isLoading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>댓글을 불러오는 데 문제가 발생했습니다.</div>;

  return (
    <Container>
      {data?.data.commentList.map((comment) => (
        <CommentCard key={comment.commentId} {...comment} />
      ))}
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
