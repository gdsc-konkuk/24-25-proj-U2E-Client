import styled from "styled-components";
import DetailAnimation from "../components/animation/DetailAnimation";
import { colFlex, rowFlex } from "../styles/flexStyles";
import NewsContents from "../components/news/NewsContents";
import ChatPanel from "../components/chat/ChatPanel";
import { useState } from "react";

const data = {
  location: "Iowa, United States",
  title: "Catastrophic Tornado Leaves Path of Destruction Across Iowa",
  mainContents: `
    A catastrophic tornado tore through central Iowa late Tuesday evening, causing unprecedented devastation in multiple communities and prompting urgent disaster relief responses from local, state, and federal agencies. The powerful storm touched down around 8:45 p.m., rapidly intensifying as it swept across populated areas, tearing roofs from buildings, uprooting massive trees, and flattening entire neighborhoods in its wake.
  
    Emergency response teams were dispatched immediately, battling challenging nighttime conditions to rescue trapped residents and provide urgent medical care. Preliminary assessments indicate hundreds of homes have been severely damaged or completely destroyed. Thousands of residents remain displaced, seeking shelter in community centers, schools, and makeshift emergency facilities.

    Iowa Governor Kim Reynolds declared a state of emergency shortly after midnight, mobilizing National Guard units to assist in search-and-rescue operations and security patrols in heavily impacted areas. Rescue workers and volunteers from neighboring states have also arrived to aid in ongoing relief efforts.

    Authorities have emphasized the extent of the damage as unprecedented in recent state history, with preliminary data suggesting wind speeds reached upwards of 280 kilometers per hour. Power lines and vital infrastructure were severely impacted, leaving nearly 50,000 residents without electricity or access to clean water. Repair crews are working around the clock, but officials warn that restoration of essential services could take several days, if not weeks.

    Residents who witnessed the storm described scenes of utter chaos and devastation. Many recounted harrowing stories of narrowly escaping collapsing buildings, while others detailed heartbreaking losses of family homes and personal possessions. Community members have rallied together, however, with remarkable resilience, opening their homes to neighbors and coordinating donations of food, clothing, and supplies to assist those most affected.

    The Federal Emergency Management Agency (FEMA) has confirmed it is coordinating closely with state officials to expedite financial aid and logistical support. Damage assessments continue today, and early estimates suggest the economic impact could exceed tens of millions of dollars.`,

  subContents: `
    Meteorologist John Porter reported the tornado maintained continuous ground contact for over 64 kilometers, marking it as one of the most destructive and longest-tracking storms in recent Iowa history. Porter emphasized that the scale and severity of damage observed is the worst seen in the region since the devastating EF-4 tornado struck Mayfield, Kentucky, in December 2021, causing significant fatalities and catastrophic infrastructure damage.

    Experts suggest that the intensity and unusual length of the storm's path could place it among the strongest tornado events ever documented in the Midwest. Residents are being urged to heed warnings and stay clear of damaged areas as recovery and cleanup efforts intensify in the coming days.`,
};

const NewsDetail = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <Container>
      <DetailAnimation />
      <ContentsContainer>
        <NewsContents {...data} onToggleChat={() => setIsChatOpen(true)} />
        <ChatPanel isVisible={isChatOpen} setIsChatOpen={setIsChatOpen} />
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 82px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  ${colFlex({ justify: "start", align: "center" })}
`;

const ContentsContainer = styled.section`
  width: 100%;
  height: 60%;
  ${rowFlex({ justify: "space", align: "center" })}
`;

export default NewsDetail;
