import styled, { css, keyframes } from "styled-components";
import UserInput from "./UserInput";
import Comments from "./Comments";
import { colFlex, rowFlex } from "../../styles/flexStyles";

interface ChatProps {
  isVisible: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Chat({ isVisible, setIsChatOpen }: ChatProps) {
  return (
    <Container isVisible={isVisible}>
      <ChatHeader>
        <ChatTitle>채팅</ChatTitle>
        <CloseButton onClick={() => setIsChatOpen(false)}>✕</CloseButton>
      </ChatHeader>

      <MessageArea>
        <Comments />
      </MessageArea>

      <InputArea>
        <UserInput />
      </InputArea>
    </Container>
  );
}

const accordionIn = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    max-height: 650px;
    transform: translateY(0);
  }
`;

const accordionOut = keyframes`
  from {
    opacity: 1;
    max-height: 650px;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    max-height: 0;
    transform: translateY(50px);
  }
`;

const Container = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  height: 500px;
  border: 1px solid white;
  ${colFlex({ justify: "space", align: "center" })}
  z-index: 1000;
  overflow: hidden;

  ${({ isVisible }) =>
    isVisible
      ? css`
          animation: ${accordionIn} 0.3s ease-in forwards;
        `
      : css`
          animation: ${accordionOut} 0.3s ease-in forwards;
        `}
`;

const ChatHeader = styled.header`
  width: 100%;
  padding: 15px;
  background-color: #4a5568;
  color: white;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const ChatTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  width: 24px;
  height: 24px;
  ${rowFlex({ justify: "center", align: "center" })}

  &:hover {
    opacity: 0.8;
  }
`;

const MessageArea = styled.div`
  width: 100%;
  padding: 15px;
  height: 80%;
  background-color: #c4c4c4;
`;

const InputArea = styled.div`
  width: 100%;
  padding: 15px;
  border-top: 1px solid #e2e8f0;
  background-color: #665f5f;
`;

export default Chat;
