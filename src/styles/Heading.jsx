import styled, { css } from "styled-components";

const test = css`
  text-align: center;
`;

const Heading = styled.h1`
  color: var(--color-grey-700);
  text-align: left;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  /* ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `} */

  ${(props) =>
    props.as === "h3" &&
    css`
      /* font-size: 1.8rem; */
      font-size: clamp(1.3rem, 2.5vw, 1.8rem);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      /* font-size: 1.8rem; */
      /* font-size: clamp(1.8rem, 2.5vw, 2.3rem); */
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    line-height: 1.4
`;

export default Heading;
