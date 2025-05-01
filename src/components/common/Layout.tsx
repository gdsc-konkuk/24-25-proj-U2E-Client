import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header/Header";

const Layout = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.main`
  flex: 1;
`;

export default Layout;
