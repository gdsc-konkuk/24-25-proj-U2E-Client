import styled from "styled-components";
import GlobeOverlay from "../components/sidebar/GlobalOverlay";
import SidebarCardList from "../components/sidebar/SidebarCardList";

const MainPage = () => {
  return (
    <Container>
      {/* 3D 지구본 영역*/}
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
