import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { media } from "../styles/breakpoints";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  border-radius: 9px;
  background-color: var(--color-grey-0);
  padding: 0.8rem 0.8rem;

  width: max-content;

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

  ${media.tabletRange} {
    font-size: 1.1rem;
  }
`;

function Select({ options, sortByField }) {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");

  function onChange(e) {
    const selectedValue = e.target.value;

    setValue(selectedValue);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(sortByField, selectedValue);
      params.set("page", 1);

      return params;
    });
  }

  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
