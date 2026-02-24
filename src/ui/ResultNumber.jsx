import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1rem;
  padding: 0.6rem 1rem;
  font-weight: 500;
  background-color: inherit;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function ResultNumber({ setSearchParams, searchParams, PAGE_SIZE }) {
  const numbers = [5, 10, 15];

  const value = PAGE_SIZE || "10";

  function handleClick(value) {
    searchParams.set("pageSize", value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      value={value}
      onChange={(e) => handleClick(Number(e.target.value))}
    >
      {numbers.map((number, i) => (
        <option key={i} value={number}>
          {number}
        </option>
      ))}
    </StyledSelect>
  );
}

export default ResultNumber;
