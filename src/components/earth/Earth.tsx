import styled from "styled-components";
import Warning from "./Warning";
import E from "./E";

const Earth = () => {
  return (
    <EarthContainer>
      {/*<Warning />*/}
      <E />
    </EarthContainer>
  );
};

const EarthContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Earth;
