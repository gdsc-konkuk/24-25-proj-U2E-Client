import { useState } from "react";
import styled from "styled-components";
import { rowFlex } from "../../styles/flexStyles";
import { useLoginMutation } from "../../hooks/useLoginQuery";
import theme from "../../styles/theme";

interface LoginProps {
  onSuccess: (userName: string) => void;
  onClose: () => void;
}

const Login = ({ onSuccess, onClose }: LoginProps) => {
  const [loginInput, setLoginInput] = useState<{
    name: string;
    password: string;
  }>({ name: "", password: "" });

  const {
    login,
    isLoading: loginLoading,
    isError: loginIsError,
  } = useLoginMutation();

  const handleLogin = async () => {
    try {
      const response = await login(loginInput);
      setLoginInput({ name: "", password: "" });
      onSuccess(response.name);
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <LoginModalContent>
        <h3>로그인</h3>
        <LoginInput
          type="text"
          placeholder="아이디"
          value={loginInput.name}
          onChange={(e) =>
            setLoginInput({ ...loginInput, name: e.target.value })
          }
        />
        <LoginInput
          type="password"
          placeholder="비밀번호"
          value={loginInput.password}
          onChange={(e) =>
            setLoginInput({ ...loginInput, password: e.target.value })
          }
        />
        <LoginButtonGroup>
          <LoginButton onClick={handleLogin} disabled={loginLoading}>
            {loginLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
          <LoginButton onClick={onClose}>취소</LoginButton>
        </LoginButtonGroup>
        {loginIsError && <ErrorMessage>로그인에 실패했습니다.</ErrorMessage>}
      </LoginModalContent>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${rowFlex({ justify: "center", align: "center" })};
  z-index: 1000;
`;

const LoginModalContent = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background: ${theme.colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

const LoginButtonGroup = styled.div`
  ${rowFlex({ justify: "space", align: "center" })};
  margin-top: 10px;
`;

const LoginButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: ${(props) => (props.disabled ? "#ccc" : theme.colors.primary)};
  color: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${(props) =>
      props.disabled ? "#ccc" : theme.colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`;

export default Login;
