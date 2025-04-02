import styled from "styled-components";

const OverlayWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const GlobeOverlay = () => {
  return <OverlayWrapper>{/* 핀, 툴팁 등 배치 가능 */}</OverlayWrapper>;
};

export default GlobeOverlay;
