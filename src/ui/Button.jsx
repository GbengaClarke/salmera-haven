import styled, { css } from "styled-components";

export const Button = styled.button`
  /* background-color: var(--color-brand-600); */
  background-color: ${({ bgc = "var(--color-brand-600)" }) => bgc};
  /* color: white; */

  color: ${({ textColor = "white" }) => textColor};

  /* font-weight: 500; */
  font-weight: ${({ fontWeight = "500" }) => fontWeight};
  padding: ${({ padding = "1rem" }) => padding};
  border-radius: 4px;
  border: none;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: ${({ fontSize = "1.3rem" }) => fontSize};

  transition: all 0.25s ease-in-out;

  &:hover,
  &:focus {
    /* background-color: var(--color-brand-700); */

    ${({ bgc }) =>
      bgc
        ? css`
            opacity: 0.85;
          `
        : css`
            background-color: var(--color-brand-700);
          `}
    outline: none;
    /* color: #f7f7f7; */
  }
`;

export const CancelButton = styled.button`
  background-color: var(--color-grey-200);
  /* color: #eaeaea; */
  color: var(--color-grey-800);
  font-weight: 500;
  padding: ${({ padding = "1rem" }) => padding};
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: ${({ fontSize = "1.3rem" }) => fontSize};

  transition: all 0.25s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-grey-300);
    outline: none;
    /* color: #f7f7f7; */
  }
`;
