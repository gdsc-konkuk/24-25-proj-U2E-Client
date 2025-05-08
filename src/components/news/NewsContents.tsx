import styled from "styled-components";
import { colFlex, rowFlex } from "../../styles/flexStyles";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

interface NewsContentsProps {
  newsData: News;
}

function NewsContents({ newsData }: NewsContentsProps) {
  const navigate = useNavigate();
  const {
    climateList,
    regionList,
    newsTitle,
    newsUrl,
    newsImageUrl,
    newsBody,
    newsDate,
  } = newsData;
  return (
    <Container>
      <HeaderContainer>
        <LocationContainer>
          <NavigationArrow
            onClick={() => navigate("/")}
          >{`<<`}</NavigationArrow>
          {regionList.map((region, index) => (
            <LocationText key={`region-${index}`}>{region}</LocationText>
          ))}
          {climateList.map((climate, index) => (
            <ClimateTag key={`climate-${index}`}>{climate}</ClimateTag>
          ))}
        </LocationContainer>
      </HeaderContainer>
      <NewsTitle>{newsTitle}</NewsTitle>
      <NewsDate>{newsDate}</NewsDate>
      {newsImageUrl && <NewsImage src={newsImageUrl} alt={newsTitle} />}
      <MainContent>{newsBody}</MainContent>
      {newsUrl && (
        <SourceLink>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer">
            원본 기사 보기
          </a>
        </SourceLink>
      )}
    </Container>
  );
}

const Container = styled.article`
  padding: 30px 50px;
  width: 70%;
  height: 100%;
  ${colFlex({ align: "center" })}
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const LocationContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const LocationText = styled.div`
  font-size: 18px;
  background-color: ${theme.colors.primary};
  padding: 5px 10px;
  border-radius: 15px;
  margin-left: auto;
`;

const ClimateTag = styled.div`
  font-size: 18px;
  background-color: ${theme.colors.secondary};
  padding: 5px 10px;
  border-radius: 15px;
  color: ${theme.colors.textPrimary};
`;

const NavigationArrow = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const NewsTitle = styled.div`
  width: 100%;
  padding: 30px 0 10px 0;
  font-size: 42px;
  text-align: start;
`;

const NewsDate = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 20px;
`;

const NewsImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 8px;
  object-fit: cover;
`;

const MainContent = styled.div`
  font-size: 20px;
  overflow-wrap: break-word;
  line-height: 35px;
  padding: 20px 0;
  width: 100%;
`;

const SourceLink = styled.div`
  margin-top: 30px;
  width: 100%;
  text-align: right;

  a {
    color: ${theme.colors.gray};
    text-decoration: underline;
    font-size: 16px;

    &:hover {
      color: ${theme.colors.gray[300]};
    }
  }
`;

export default NewsContents;
