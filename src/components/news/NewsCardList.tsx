import styled from "styled-components";
import { colFlex, rowFlex } from "../../styles/flexStyles";
import NewsCard from "./NewsCard";

interface Props {
  newsData: RecentNews[];
}

function NewsCardList({ newsData }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Title>{`>>`} Related News</Title>
      </TitleContainer>
      {newsData.map((news, index) => (
        <NewsCard
          key={index}
          newsId={news.newsId}
          title={news.newsTitle}
          delay={index * 80}
          regionList={news.regionList}
          climateList={news.climateList}
        />
      ))}
    </Container>
  );
}

export default NewsCardList;

const Container = styled.div`
  width: 27%;
  position: absolute;
  top: 100px;
  right: 40px;
  height: 80vh;
  ${colFlex({ align: "center", justify: "start" })}
  gap: 16px;
  overflow-y: auto;
  padding: 5px 10px;
  z-index: 5;
`;

const TitleContainer = styled.header`
  width: 100%;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const Title = styled.p``;
