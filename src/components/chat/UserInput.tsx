import styled from "styled-components";
import { rowFlex } from "../../styles/flexStyles";
import SendIcon from "../../assets/svgs/SendIcon.svg?react";
import UserIcon from "../../assets/svgs/UserIcon.svg?react";
import { useState } from "react";
import { useCreateCommentMutation } from "../../hooks/useCommentsQuery";
import { useLoginMutation } from "../../hooks/useLoginQuery";
import theme from "../../styles/theme";
import { useParams } from "react-router-dom";
import Login from "./Login";

const UserInput = () => {
  const newsId = Number(useParams().newsId) || 1;
  const [userInput, setUserInput] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || ""
  );

  const { mutate: createComment } = useCreateCommentMutation();
  const { logout } = useLoginMutation();

  const sendComment = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    createComment({
      userName,
      newsId,
      contents: userInput,
    });

    setUserInput("");
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserName("");
    alert("로그아웃 되었습니다.");
  };

  const inputPlaceholder = isLoggedIn
    ? `${userName}님 댓글을 입력하세요`
    : "로그인하여 댓글을 작성하세요";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
      sendComment();
    }
  };

  return (
    <>
      <Container>
        <LoginIconWrapper
          onClick={isLoggedIn ? handleLogout : () => setShowLoginModal(true)}
          title={isLoggedIn ? "로그아웃" : "로그인"}
        >
          <UserIcon
            width={"20px"}
            height={"20px"}
            style={{ opacity: isLoggedIn ? 1 : 0.7 }}
          />
          {isLoggedIn && <LoginStatusDot />}
        </LoginIconWrapper>
        <StyledInput
          type="text"
          placeholder={inputPlaceholder}
          value={userInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={!isLoggedIn}
        />
        <SendIconWrapper
          onClick={isLoggedIn ? sendComment : () => setShowLoginModal(true)}
        >
          <SendIcon width={"24px"} height={"24px"} />
        </SendIconWrapper>
      </Container>

      {showLoginModal && (
        <Login
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
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
  width: calc(100% - 60px);
  padding: 0 10px;
  outline: none;
  border: none;
`;

const SendIconWrapper = styled.div`
  ${rowFlex({ justify: "center", align: "center" })};
  cursor: pointer;
`;

const LoginIconWrapper = styled.div`
  ${rowFlex({ justify: "center", align: "center" })};
  position: relative;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const LoginStatusDot = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4caf50;
  border: 1px solid white;
`;

export default UserInput;
