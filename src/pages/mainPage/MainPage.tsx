import styled from "styled-components";
import Header from "../../components/Header";
import GlobeOverlay from "./GlobalOverlay";
import SidebarCardList from "./SidebarCardList";

const MainPage = () => {
  return (
    <Container>
      <Header />
      {/* 3D 지구본 영역은 여기에 배치 */}
      <GlobeOverlay />
      <SidebarCardList />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #040d21 0%, #0b1b3f 100%);
  overflow: hidden;
  position: relative;
`;

export default MainPage;
