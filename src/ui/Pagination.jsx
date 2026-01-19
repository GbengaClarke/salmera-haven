import styled from "styled-components";
import { Button } from "./Button";

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-grey-500);
  /* border: 1px solid red; */
  width: 100%;
  font-size: 1.1rem;
`;
const StyledNav = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--color-grey-500);
`;

const StyledButton = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 3px;
  background-color: inherit;
  color: var(--color-grey-600);
  /* border: 1px solid red; */
  border: none;

  &:hover {
    background-color: var(--color-grey-200);
    color: var(--color-grey-900);
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: 1px solid var(--color-grey-300);
  }
`;

function Pagination() {
  return (
    <StyledPagination>
      <div>Showing 1 to 10 of 16 results</div>
      <StyledNav>
        <StyledButton>&#10094; Previous</StyledButton>
        <StyledButton>Next &#10095;</StyledButton>
      </StyledNav>
    </StyledPagination>
  );
}

export default Pagination;
