import styled from "styled-components";
import { rowFlex } from "../styles/flexStyles";

const Header = () => {
  return (
    <HeaderContainer>
      <div>About US</div>
      <Divider></Divider>
      <div>U2E</div>
    </HeaderContainer>
  );
};

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  ${rowFlex({ align: "center" })}
  gap: 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;

export default Header;
