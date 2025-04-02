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
  font-family: sans-serif;
  background: linear-gradient(180deg, #040d21 0%,rgb(14, 42, 108) 100%);
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
`;
