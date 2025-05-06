import React, { useState } from "react";
import styled from "styled-components";

import SearchIcon from "../../../assets/svgs/search.svg?react";
import { rowFlex } from "../../../styles/flexStyles";
import theme from "../../../styles/theme";
import { useSearchParams } from "react-router-dom";

const SearchBox = () => {
  const [region, setRegion] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (region.trim() !== "") {
      newParams.set("query", region.trim());
    } else {
      newParams.delete("query");
    }
    setSearchParams(newParams);
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <SearchIcon width={24} height={24} />

      <Input
        placeholder=""
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 300px;
  max-width: 350px;
  height: 45px;
  ${rowFlex({ align: "center" })}
  gap: 10px;
  padding: 6px 14px;

  border-radius: 999px;
  margin: 0 40px;
  color: ${theme.colors.primary};

  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 204, 255, 0.3);
  box-shadow: 0 0 10px rgba(17, 180, 255, 0.5);
  backdrop-filter: blur(6px);
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${theme.colors.textSecondary};
  flex: 1;
  font-family: "Tektur", sans-serif;
  font-size: 14px;
  &::placeholder {
    color: #00f0ff99;
  }
`;

export default SearchBox;
