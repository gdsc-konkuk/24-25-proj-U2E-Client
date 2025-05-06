import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

interface Props {
  newsId: number;
  title: string;
  description: string;
  delay: number;
}

function NewsCard({ newsId, title, description, delay }: Props) {
  const navigate = useNavigate();

  const redirectToNewsDetail = () => {
    navigate(`/news-detail/${newsId}`);
  };

  return (
    <Card $delay={delay} onClick={redirectToNewsDetail}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div<{ $delay: number }>`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #2e3c55;
  padding: 16px;
  border-radius: 10px;
  width: 80%;
  color: white;
  backdrop-filter: blur(4px);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  position: relative;
  animation: ${fadeUp} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => `${$delay}ms`};
  cursor: pointer;
  opacity: 0;
  &:hover {
    transform: 0.3s;
    box-shadow: 0 6px 12px rgba(60, 157, 244, 0.3);
    border-color: #3c9df4;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #a9b4c2;
`;

export default NewsCard;
