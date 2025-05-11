import styled from "styled-components";
import Globe from "./Globe";
import { usePinQuery } from "../../hooks/usePinsQuery";

const Earth = () => {
  const { data: pinList } = usePinQuery();

  return (
    <EarthContainer>
      {/* TODO: 추후에 디자인 요소가 추가될 수 있음 */}
      <Globe pinList={pinList} />
    </EarthContainer>
  );
};

const EarthContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Earth;
