import styled from "styled-components";
import Globe from "./Globe";
import { usePinQuery } from "../../hooks/usePinsQuery";
import { useSearchParams } from "react-router-dom";
import { rowFlex } from "../../styles/flexStyles";

const Earth = () => {
  //url에서 파라미터 가져오기
  const [searchParams] = useSearchParams();
  const region = searchParams.get("query");
  const climate = searchParams.get("filter");

  const { data: pinList, isLoading } = usePinQuery(region, climate);

  if (isLoading) {
    return <LoadingWrapper>Loading ...</LoadingWrapper>;
  }
  return (
    <EarthContainer>
      <Globe pinList={pinList} />
    </EarthContainer>
  );
};

const EarthContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  font-size: 20px;
  font-weight: bold;
  ${rowFlex({ justify: "center", align: "center" })};
`;

export default Earth;
