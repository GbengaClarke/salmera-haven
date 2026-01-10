import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--color-brand-600);
  /* color: #eaeaea; */
  color: white;
  font-weight: 500;
  padding: ${({ padding = "1rem" }) => padding};
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: ${({ fontSize = "auto" }) => fontSize};

  transition: all 0.25s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-brand-700);
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
  font-size: ${({ fontSize = "auto" }) => fontSize};

  transition: all 0.25s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--color-grey-300);
    outline: none;
    /* color: #f7f7f7; */
  }
`;
