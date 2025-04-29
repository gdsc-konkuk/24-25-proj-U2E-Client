import styled, { css, keyframes } from "styled-components";
import UserInput from "./UserInput";
import Comments from "./Comments";
import { colFlex, rowFlex } from "../../styles/flexStyles";
import ChatPanelFrameSvg from "../../assets/svgs/ChatPanelFrame.svg?react";

interface ChatPanelProps {
  isVisible: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatPanel({ isVisible, setIsChatOpen }: ChatPanelProps) {
  return (
    <Container isVisible={isVisible}>
      <SVGFrameWrapper>
        <ChatPanelFrameSvg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
      </SVGFrameWrapper>
      <ContentContainer>
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
      </ContentContainer>
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
  width: 382px;
  height: 552px;
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

const SVGFrameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  ${colFlex({ justify: "space", align: "center" })}
  z-index: 1;
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
  ${colFlex({ justify: "center", align: "center" })}

  &:hover {
    opacity: 0.8;
  }
`;

const MessageArea = styled.div`
  width: 100%;
  padding: 15px;
  flex: 1;
  background-color: rgba(196, 196, 196, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin-bottom: 15px;
`;

const InputArea = styled.div`
  width: 100%;
  padding: 15px;
  border-top: 1px solid rgba(226, 232, 240, 0.3);
  background-color: rgba(102, 95, 95, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;
`;

export default ChatPanel;
