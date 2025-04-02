import styled, { keyframes } from "styled-components";

interface Props {
  title: string;
  description: string;
  delay: number;
}

const SidebarCard = ({ title, description, delay }: Props) => {
  return (
    <Card $delay={delay}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

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
  border-radius: 12px;
  width: 300px;
  color: white;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  transform-style: preserve-3d;
  position: relative;
  animation: ${fadeUp} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => `${$delay}ms`};
  cursor: pointer;
  opacity: 0;

  &:hover {
    transform: translateY(-6px) scale(1.02) perspective(600px) rotateX(2deg);
    box-shadow: 0 12px 24px rgba(60, 157, 244, 0.3);
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

export default SidebarCard;
