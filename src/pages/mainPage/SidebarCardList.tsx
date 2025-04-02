import styled from "styled-components";
import SidebarCard from "./SidebarCard";
import { colFlex } from "../../styles/flexStyles";

const data = [
  {
    title: "Bangladesh",
    description:
      "Frequently experiences devastating floods and rising sea levels, threatening millions living in low-lying coastal areas.",
  },
  {
    title: "Australia",
    description:
      "Faces extreme heatwaves and increasing frequency of bushfires due to prolonged droughts and rising temperatures.",
  },
  {
    title: "Maldives",
    description:
      "One of the most vulnerable nations to sea level rise, with the risk of being submerged in the coming decades.",
  },
  {
    title: "Bangladesh",
    description:
      "Frequently experiences devastating floods and rising sea levels, threatening millions living in low-lying coastal areas.",
  },
  {
    title: "South Korea",
    description:
      "Experiencing increasing typhoon activity and seasonal flood risks due to rising ocean temperatures.",
  },
  {
    title: "Japan",
    description:
      "Susceptible to earthquakes and tsunamis, with coastal cities vulnerable to sea-level rise.",
  },
  {
    title: "India",
    description:
      "Facing rising heatwaves and water scarcity in densely populated regions.",
  },
  {
    title: "Philippines",
    description:
      "Frequently hit by powerful typhoons, with rural communities at high risk.",
  },
  {
    title: "Indonesia",
    description:
      "Experiencing rising sea levels and increased coastal flooding threatening low-lying areas.",
  },
  {
    title: "Vietnam",
    description:
      "Delta regions at high risk of inundation due to sea level rise and increased rainfall.",
  },
];

const SidebarCardList = () => {
  return (
    <ListContainer>
      {data.map((item, index) => (
        <SidebarCard
          key={index}
          title={item.title}
          description={item.description}
          delay={index * 80}
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  position: absolute;
  top: 120px;
  right: 40px;
  height: 90vh;
  ${colFlex({ align: "center", justify: "center" })}
  gap: 16px;
  overflow-y: auto;
  padding: 5px 10px;
  z-index: 5;
`;

export default SidebarCardList;
