import React, { useState } from "react";
import styled from "styled-components";

import RainIcon from "../../../assets/svgs/climate/Rain.svg?react";
import TemperatureIcon from "../../../assets/svgs/climate/Temperature.svg?react";
import TornadoIcon from "../../../assets/svgs/climate/Tornado.svg?react";
import DustIcon from "../../../assets/svgs/climate/Dust.svg?react";
import { rowFlex } from "../../../styles/flexStyles";

const filters = [
  { id: "rain", icon: RainIcon },
  { id: "temperature", icon: TemperatureIcon },
  { id: "tornado", icon: TornadoIcon },
  { id: "dust1", icon: DustIcon },
  { id: "dust2", icon: DustIcon },
  { id: "dust3", icon: DustIcon },
];

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  return (
    <LeftGroup>
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <IconWrapper
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() =>
              setActiveFilter(activeFilter === filter.id ? null : filter.id)
            }
          >
            <Icon />
          </IconWrapper>
        );
      })}
    </LeftGroup>
  );
};

const LeftGroup = styled.div`
  width: fit-content;
  height: 45px;
  gap: 8px;
  padding: 2px 6px;
  border-radius: 999px;
  ${rowFlex({ align: "center", justify: "center" })};

  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 204, 255, 0.3);
  box-shadow: 0 0 10px rgba(20, 181, 255, 0.5);
  backdrop-filter: blur(6px);
`;

const IconWrapper = styled.div<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  padding: 6px;
  ${rowFlex({ align: "center", justify: "center" })};
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme, active }) =>
    active ? theme.colors.textSecondary : theme.colors.gray[500]};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default FilterBar;
