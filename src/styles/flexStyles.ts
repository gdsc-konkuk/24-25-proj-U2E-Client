// src/styles/flexStyles.ts
import { css } from "styled-components";

type FlexAttribute = "start" | "center" | "end" | "evenly" | "space";

interface FlexProps {
  justify?: FlexAttribute;
  align?: FlexAttribute;
}

const flexMap: { [key in FlexAttribute]: string } = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  evenly: "space-evenly",
  space: "space-between",
};

const flexContents = ({ justify, align }: FlexProps) => css`
  ${justify && `justify-content: ${flexMap[justify]};`}
  ${align && `align-items: ${flexMap[align]};`}
`;

export const colFlex = ({ justify, align }: FlexProps = {}) => css`
  display: flex;
  flex-direction: column;
  ${flexContents({ justify, align })}
`;

export const rowFlex = ({ justify, align }: FlexProps = {}) => css`
  display: flex;
  flex-direction: row;
  ${flexContents({ justify, align })}
`;
