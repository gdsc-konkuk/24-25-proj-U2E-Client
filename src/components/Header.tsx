import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrapper>
      <div>About US</div>
      <Divider></Divider>
      <div>U2E</div>
    </HeaderWrapper>
  );
};

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const HeaderWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;

export default Header;
