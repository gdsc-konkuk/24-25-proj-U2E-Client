import styled from "styled-components";
import GlobeOverlay from "../components/sidebar/GlobalOverlay";
import Earth from "../components/earth/Earth";
import { useRecentNewsQuery } from "../hooks/useNewsQuery";
import NewsCardList from "../components/news/NewsCardList";

const MainPage = () => {
  const { data: response, error } = useRecentNewsQuery();

  if (error) {
    alert("뉴스를 불러오는 데 실패했습니다.");
    return null;
  }

  return (
    <Container>
      <Earth />
      <GlobeOverlay />
      <NewsCardList newsData={response?.data?.latelyNewsList || []} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #040d21 0%, #0b1b3f 100%);
  overflow: hidden;
  position: relative;
`;

export default MainPage;
