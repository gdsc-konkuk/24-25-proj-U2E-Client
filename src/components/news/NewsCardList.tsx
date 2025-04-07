import styled from "styled-components";
import { colFlex, rowFlex } from "../../styles/flexStyles";
import NewsCard from "./NewsCard";

const data = [
  {
    newsId: 1,
    title: "Bangladesh",
    description:
      "Frequently experiences devastating floods and rising sea levels, threatening millions living in low-lying coastal areas.",
  },
  {
    newsId: 2,
    title: "Australia",
    description:
      "Faces extreme heatwaves and increasing frequency of bushfires due to prolonged droughts and rising temperatures.",
  },
  {
    newsId: 3,
    title: "Maldives",
    description:
      "One of the most vulnerable nations to sea level rise, with the risk of being submerged in the coming decades.",
  },
  {
    newsId: 4,
    title: "Bangladesh",
    description:
      "Frequently experiences devastating floods and rising sea levels, threatening millions living in low-lying coastal areas.",
  },
  {
    newsId: 5,
    title: "South Korea",
    description:
      "Experiencing increasing typhoon activity and seasonal flood risks due to rising ocean temperatures.",
  },
  {
    newsId: 6,
    title: "Japan",
    description:
      "Susceptible to earthquakes and tsunamis, with coastal cities vulnerable to sea-level rise.",
  },
  {
    newsId: 7,
    title: "India",
    description:
      "Facing rising heatwaves and water scarcity in densely populated regions.",
  },
  {
    newsId: 8,
    title: "Philippines",
    description:
      "Frequently hit by powerful typhoons, with rural communities at high risk.",
  },
  {
    newsId: 9,
    title: "Indonesia",
    description:
      "Experiencing rising sea levels and increased coastal flooding threatening low-lying areas.",
  },
  {
    newsId: 10,
    title: "Vietnam",
    description:
      "Delta regions at high risk of inundation due to sea level rise and increased rainfall.",
  },
];

interface Props {
  setIsShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewsCardList({ setIsShowSidebar }: Props) {
  const showSidebar = () => {
    setIsShowSidebar(true);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{`>>`} Related News</Title>
        <ShowSidebarIcon onClick={showSidebar}>Back</ShowSidebarIcon>
      </TitleContainer>
      {data.map((item, index) => (
        <NewsCard
          key={index}
          newsId={item.newsId}
          title={item.title}
          description={item.description}
          delay={index * 80}
        />
      ))}
    </Container>
  );
}

export default NewsCardList;

const Container = styled.div`
  position: absolute;
  top: 100px;
  right: 40px;
  height: 80vh;
  width: 60%;
  ${colFlex({ align: "center", justify: "start" })}
  gap: 16px;
  overflow-y: auto;
  padding: 5px 10px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.2);
`;

const TitleContainer = styled.header`
  width: 80%;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const Title = styled.p``;

const ShowSidebarIcon = styled.div`
  cursor: pointer;
  &:hover {
    transform: 0.3s;
    box-shadow: 0 6px 12px rgba(60, 157, 244, 0.3);
  }
`;
