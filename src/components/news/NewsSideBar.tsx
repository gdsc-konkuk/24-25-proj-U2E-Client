import styled from "styled-components";
import theme from "../../styles/theme";
import { colFlex } from "../../styles/flexStyles";

interface NewsSideBarProps {
  newsUrl: string;
  isLoading: boolean;
  solution: string;
  relatedNews: string[];
}

const NewsSideBar = ({
  newsUrl,
  isLoading,
  solution,
  relatedNews,
}: NewsSideBarProps) => {
  const hasRelatedNews = relatedNews && relatedNews.length > 0;

  return (
    <Container>
      {newsUrl && (
        <LinkCard>
          <LinkCardTitle>Original Article</LinkCardTitle>
          <LinkDescription>Check the source of this article</LinkDescription>
          <LinkButton href={newsUrl} target="_blank" rel="noopener noreferrer">
            View Original Article
          </LinkButton>
        </LinkCard>
      )}

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

      {hasRelatedNews && (
        <RelatedNewsCard>
          <LinkCardTitle>Related News (by Gemini)</LinkCardTitle>
          <LinkDescription>
            Explore related articles on this topic
          </LinkDescription>
          {relatedNews.map((news, index) => (
            <RelatedNewsLink
              key={index}
              href={news}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Related Article {index + 1}
            </RelatedNewsLink>
          ))}
        </RelatedNewsCard>
      )}
    </Container>
  );
};

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

const Container = styled.div`
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

export default NewsSideBar;
