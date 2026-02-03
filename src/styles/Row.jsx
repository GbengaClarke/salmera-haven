import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  padding: 0.5rem 0.7rem;

  ${({ scroll }) =>
    scroll === "scroll" &&
    css`
      overflow-x: scroll;
    `}

  ${({ type = "vertical" }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      /* align-items: center; */
    `};

  ${({ type }) =>
    type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;

export default Row;
