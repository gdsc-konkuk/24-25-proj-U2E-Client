import React, { useState } from "react";
import styled from "styled-components";

import SearchIcon from "../../../assets/svgs/search.svg?react";
import { rowFlex } from "../../../styles/flexStyles";
import theme from "../../../styles/theme";

const Wrapper = styled.div`
  width: 300px;
  max-width: 350px;
  height: 45px;
  ${rowFlex({ align: "center" })}
  gap: 10px;
  padding: 6px 14px;

  border-radius: 999px;
  margin: 0 40px;
  color: ${theme.colors.textSecondary};

  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 204, 255, 0.3);
  box-shadow: 0 0 10px rgba(17, 180, 255, 0.5);
  backdrop-filter: blur(6px);
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.white};
  flex: 1;
  font-size: 14px;
  &::placeholder {
    color: #00f0ff99;
  }
`;

const SearchBox = () => {
  const [query, setQuery] = useState("");

  return (
    <Wrapper>
      <SearchIcon width={24} height={24} />
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Wrapper>
  );
};

export default SearchBox;
