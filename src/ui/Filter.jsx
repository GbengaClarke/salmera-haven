import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  font-size: 1rem;
  font-family: "Inter";
  font-weight: 500;
  color: var(--color-grey-600);
  /* gap: 0.8rem; */
  /* padding: 0.6rem 0.9rem; */
  /* border: 1px solid red; */
  background-color: var(--color-grey-0);
  border-radius: 9px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-100);
`;

const FilterOption = styled.div`
  padding: 0.6rem 0.8rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-500); //lower opacity later
    color: white;
    /* color: var(--color-grey-100); */
  }
`;

function Filter({ options }) {
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterOption key={option.value}>{option.label}</FilterOption>
      ))}
    </StyledFilter>
  );
}

export default Filter;
