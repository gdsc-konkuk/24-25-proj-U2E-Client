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
    <PageLayout>
      <Container>
        <HeaderContainer>
          <LocationContainer>
            <NavigationArrow
              onClick={() => navigate("/")}
            >{`<<`}</NavigationArrow>
            <TagContainer>
              {regionList.map((region, index) => (
                <LocationText key={`region-${index}`}>{region}</LocationText>
              ))}
              {climateList.map((climate, index) => (
                <ClimateTag key={`climate-${index}`}>{climate}</ClimateTag>
              ))}
            </TagContainer>
          </LocationContainer>
        </HeaderContainer>
        <NewsTitle>{newsTitle}</NewsTitle>
        <NewsDate>{newsDate}</NewsDate>
        {newsImageUrl && <NewsImage src={newsImageUrl} alt={newsTitle} />}
        <MainContent>{newsBody}</MainContent>
      </Container>
      {newsUrl && (
        <NewsLinkCardContainer>
          <LinkCard>
            <LinkCardTitle>Original Article</LinkCardTitle>
            <LinkDescription>Check the source of this article</LinkDescription>
            <LinkButton
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Original Article
            </LinkButton>
          </LinkCard>
        </NewsLinkCardContainer>
      )}
    </PageLayout>
  );
}

const PageLayout = styled.div`
  width: 100%;
  height: 100%;
  gap: 10px;
  ${rowFlex({ justify: "center", align: "start" })}
`;

const Container = styled.article`
  flex: 7;
  padding: 30px 50px;
  height: 100%;
  ${colFlex({ align: "center" })}
`;

const NewsLinkCardContainer = styled.div`
  flex: 3;
  padding: 30px 20px 30px 0;
  ${colFlex({ align: "start" })}
`;

const LinkCard = styled.div`
  border: 2px solid ${theme.colors.primary};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  ${colFlex({ align: "start" })}
  gap: 15px;
  margin-top: 30px;
`;

const LinkCardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.textPrimary};
`;

const LinkDescription = styled.p`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const LinkButton = styled.a`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textPrimary};
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: medium;
  font-size: 14px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
  }
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
`;

const TagContainer = styled.div`
  gap: 10px;
  ${rowFlex({ justify: "center", align: "center" })}
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

export default NewsContents;
