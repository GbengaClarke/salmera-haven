import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1rem;
  /* border: 1px solid red; */
  font-weight: 500;
  color: var(--color-grey-600);
  border-radius: 9px;
  background-color: var(--color-grey-0);
  padding: 0.7rem 0.8rem;
  width: 100%;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-100);

  outline: none;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    border: 1px solid var(--color-blue-700);
  }

  @media (min-width: 594px) {
    width: fit-content;
  }

  @media (max-width: 363px) {
    font-size: 0.9rem;
  }
`;

function Select({ options }) {
  function placeholder() {}
  return (
    <StyledSelect value={""} onChange={placeholder}>
      {options.map((option) => (
        <option value={option.value} onChange={placeholder} key={option.value}>
          {" "}
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
