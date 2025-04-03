import styled from "styled-components";
import { rowFlex } from "../../styles/flexStyles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <LogoContainer>
        <div>About US</div>
        <Divider></Divider>
        <div onClick={() => navigate("/")}>U2E</div>
      </LogoContainer>
    </HeaderContainer>
  );
};

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 82px;
  ${rowFlex({ align: "center", justify: "end" })}
  padding: 0 32px;
  z-index: 999;
  background: transparent;
  backdrop-filter: blur(8px);
`;

const LogoContainer = styled.div`
  ${rowFlex({ align: "center", justify: "end" })}
  gap: 24px;
  div {
    cursor: pointer;
  }
`;
export default Header;
