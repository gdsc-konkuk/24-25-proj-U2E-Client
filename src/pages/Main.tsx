import styled from "styled-components";
import GlobeOverlay from "../components/sidebar/GlobalOverlay";
import SidebarCardList from "../components/sidebar/SidebarCardList";
import { useState } from "react";
import NewsCardList from "../components/news/NewsCardList";
import Earth from "../components/earth/Earth";

const MainPage = () => {
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(true);

  return (
    <Container>
      <Earth /> {/* 3D 지구본 영역*/}
      <GlobeOverlay />
      {isShowSidebar ? (
        <SidebarCardList setIsShowSidebar={setIsShowSidebar} />
      ) : (
        <NewsCardList setIsShowSidebar={setIsShowSidebar} />
      )}
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
