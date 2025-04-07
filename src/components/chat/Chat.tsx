import styled from "styled-components";
import UserInput from "./UserInput";
import Comments from "./Comments";
import { colFlex } from "../../styles/flexStyles";

function Chat() {
  return (
    <Container>
      <ChatHeader>
        <ChatTitle>채팅</ChatTitle>
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

const Container = styled.div`
  height: 650px;
  width: 400px;
  border: 1px solid white;
  ${colFlex({ justify: "space", align: "center" })}
`;

const ChatHeader = styled.header`
  width: 100%;
  padding: 15px 20px;
  background-color: #4a5568;
  color: white;
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const MessageArea = styled.div`
  width: 100%;
  padding: 10px;
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
