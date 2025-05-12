import styled from "styled-components";
import { colFlex, rowFlex } from "../../styles/flexStyles";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGeminiSolution } from "../../api/geminiApi";

interface NewsContentsProps {
  newsData: News;
}

const NewsContents = ({ newsData }: NewsContentsProps) => {
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
  const [solution, setSolution] = useState<string>("");
  const [relatedNews, setRelatedNews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getGeminiSolution(newsBody)
      .then((data) => {
        setSolution(data.solution);
        setRelatedNews(data.relatedNews);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Gemini solution:", error);
        setIsLoading(false);
      });
  }, [newsBody]);

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
        {newsImageUrl && <NewsImage src={newsImageUrl} alt={newsTitle} />}{" "}
        <MainContent>{newsBody}</MainContent>
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Analyzing news content...</LoadingText>
          </LoadingContainer>
        ) : (
          solution && (
            <SolutionContainer>
              <SolutionHeader>Proposed Solutions (by Gemini)</SolutionHeader>
              <SolutionContent>{solution}</SolutionContent>
            </SolutionContainer>
          )
        )}
      </Container>
      <SidebarContainer>
        {newsUrl && (
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
        )}
        {isLoading ? (
          <RelatedNewsCard>
            <LinkCardTitle>Related News (by Gemini)</LinkCardTitle>
            <LinkDescription>Finding related articles...</LinkDescription>
            <LoadingSpinnerSmall />
          </RelatedNewsCard>
        ) : (
          relatedNews &&
          relatedNews.length > 0 && (
            <RelatedNewsCard>
              <LinkCardTitle>Related News (by Gemini)</LinkCardTitle>
              <LinkDescription>
                Explore related articles on this topic
              </LinkDescription>
              {relatedNews.map((url, index) => (
                <RelatedNewsLink
                  key={`related-${index}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`Related Article ${index + 1}`}
                </RelatedNewsLink>
              ))}
            </RelatedNewsCard>
          )
        )}
      </SidebarContainer>
    </PageLayout>
  );
};

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

const SidebarContainer = styled.div`
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

const RelatedNewsCard = styled.div`
  border: 2px solid ${theme.colors.secondary};
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

const RelatedNewsLink = styled.a`
  display: inline-block;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.textPrimary};
  padding: 8px 12px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  margin-top: 5px;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primary};
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

const SolutionContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid ${theme.colors.secondary};
  border-radius: 10px;
  background-color: rgba(0, 99, 166, 0.1);
  ${colFlex({ align: "start" })}
`;

const SolutionHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.textPrimary};
  margin-bottom: 15px;
`;

const SolutionContent = styled.div`
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.textPrimary};
`;

const LoadingContainer = styled.div`
  width: 100%;
  margin: 30px 0;
  padding: 20px;
  ${colFlex({ justify: "center", align: "center" })}
  gap: 20px;
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: ${theme.colors.textSecondary};
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 99, 166, 0.1);
  border-top-color: ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinnerSmall = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 99, 166, 0.1);
  border-top-color: ${theme.colors.secondary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 10px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default NewsContents;
