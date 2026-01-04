import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1rem;
  /* border: 1px solid red; */
  font-family: "Inter";
  font-weight: 500;
  color: var(--color-grey-600);
  border-radius: 9px;
  background-color: var(--color-grey-0);
  padding: 0.7rem 0.8rem;
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

  & option {
    font-family: "Inter";
  }
`;

// const Styledoption = styled.option`
//   font-family: "Inter";
// `;

function Select({ options }) {
  return (
    <StyledSelect value={""}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {" "}
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
