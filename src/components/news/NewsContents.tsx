import styled from "styled-components";
import { colFlex, rowFlex } from "../../styles/flexStyles";

interface Props {
  location: string;
  title: string;
  mainContents: string;
  subContents: string;
  onToggleChat: () => void;
}

function NewsContents({
  location,
  title,
  mainContents,
  subContents,
  onToggleChat,
}: Props) {
  return (
    <Container>
      <HeaderContainer>
        <LocationText>{location}</LocationText>
        <NavigationArrow onClick={onToggleChat}>{`>>`}</NavigationArrow>
      </HeaderContainer>
      <NewsTitle>{title}</NewsTitle>
      <MainContent>{mainContents}</MainContent>
      <SubContent>{subContents}</SubContent>
    </Container>
  );
}

const Container = styled.article`
  padding: 10px 20px;
  width: 70%;
  height: 100%;
  ${colFlex({ align: "center" })}
  border: 1px solid white;
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const LocationText = styled.div`
  font-size: 24px;
`;

const NavigationArrow = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const NewsTitle = styled.div`
  width: 100%;
  padding: 30px 0;
  font-size: 42px;
  text-align: start;
`;

const MainContent = styled.div`
  font-size: 20px;
  overflow-wrap: break-word;
  line-height: 35px;
  padding: 20px 0;
`;

const SubContent = styled.div`
  font-size: 20px;
  overflow-wrap: break-word;
  line-height: 35px;
  color: #b0edff;
`;

export default NewsContents;
