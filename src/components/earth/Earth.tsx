import styled from "styled-components";
//import Warning from "./Warning";

import Globe from "./Globe";

const Earth = () => {
  return (
    <EarthContainer>
      {/*<Warning />*/}
      <Globe />
    </EarthContainer>
  );
};

const EarthContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Earth;
