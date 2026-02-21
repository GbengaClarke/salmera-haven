import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-600);
  background-color: var(--color-grey-0);
  border-radius: 9px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-100);
  white-space: nowrap;
`;

const FilterOption = styled.button`
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  border: none;
  background: none;

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--color-brand-500);
      color: white;
    `}

  &:hover {
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

function Filter({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(value) {
    if (value === presentFilter) return;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(filterField, value);

      if (filterField !== "lastDays" && filterField !== "discount") {
        params.set("page", 1);
      }

      return params;
    });
  }

  const presentFilter = searchParams.get(filterField) || "7";

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterOption
          onClick={() => {
            handleFilter(option.value);
          }}
          $active={presentFilter === option.value}
          key={option.value}
        >
          {option.label}
        </FilterOption>
      ))}
    </StyledFilter>
  );
}

export default Filter;
