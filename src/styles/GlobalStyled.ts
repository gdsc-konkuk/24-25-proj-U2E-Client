// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-family: sans-serif;
    color: #fff;
  }
  body {
  height: 100%;
  margin: 0;
  font-family: 'Tektur', sans-serif;
  font-weight: 600;
  background: linear-gradient(180deg, #040d21 0%,#0e2a6c 100%);
  color: #fff;
  overflow: hidden;
}

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  //스크롤바
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2e3c55;
    border-radius: 4px;
  }

`;
