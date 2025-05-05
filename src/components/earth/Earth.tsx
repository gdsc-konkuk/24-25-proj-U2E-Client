import styled from "styled-components";
import Warning from "./Warning";

const Earth = () => {
  return (
    <EarthContainer>
      <Warning />
    </EarthContainer>
  );
};

const EarthContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Earth;
