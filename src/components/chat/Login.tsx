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
      console.error("Login failed:", err);
      alert("Login failed. Please try again.");
    }
  };
  return (
    <Container>
      <LoginModalContent>
        <h3>Login</h3>
        <LoginInput
          type="text"
          placeholder="Username"
          value={loginInput.name}
          onChange={(e) =>
            setLoginInput({ ...loginInput, name: e.target.value })
          }
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={loginInput.password}
          onChange={(e) =>
            setLoginInput({ ...loginInput, password: e.target.value })
          }
        />
        <LoginButtonGroup>
          <LoginButton onClick={handleLogin} disabled={loginLoading}>
            {loginLoading ? "Logging in..." : "Login"}
          </LoginButton>
          <LoginButton onClick={onClose}>Cancel</LoginButton>
        </LoginButtonGroup>
        {loginIsError && (
          <ErrorMessage>Login failed. Please try again.</ErrorMessage>
        )}
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
