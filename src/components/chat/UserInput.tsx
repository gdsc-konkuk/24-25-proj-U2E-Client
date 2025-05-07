import styled from "styled-components";
import { rowFlex } from "../../styles/flexStyles";
import SendIcon from "../../assets/svgs/SendIcon.svg?react";
import { useState } from "react";
import { useCreateCommentMutation } from "../../hooks/useCommentsQuery";
import theme from "../../styles/theme";
import { useParams } from "react-router-dom";

const UserInput = () => {
  const newsId = Number(useParams().newsId) || 1;
  const [userInput, setUserInput] = useState<string>("");

  const { mutate: createComment, error: createError } =
    useCreateCommentMutation();

  const sendComment = () => {
    createComment({
      userId: 123,
      userName: "천재",
      newsId,
      contents: userInput,
    });

    setUserInput("");
  };

  if (createError) {
    alert("댓글 작성에 실패했습니다.");
  }

  return (
    <Container>
      <StyledInput
        type="text"
        placeholder="Enter your comment"
        value={userInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserInput(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            sendComment();
          }
        }}
      />
      <SendIconWrapper onClick={sendComment}>
        <SendIcon width={"24px"} height={"24px"} />
      </SendIconWrapper>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  width: 90%;
  height: 45px;
  border-radius: 30px;
  background: ${theme.colors.white};
  ${rowFlex({ justify: "center", align: "center" })};
`;

const StyledInput = styled.input`
  width: calc(100% - 30px);
  padding: 0 10px;
  outline: none;
  border: none;
`;

const SendIconWrapper = styled.div`
  ${rowFlex({ justify: "center", align: "center" })};
`;

export default UserInput;
