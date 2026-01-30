import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  font-size: 1rem;
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
  white-space: nowrap;

  & div {
  }

  @media (max-width: 394px) {
    /* white-space: nowrap; */
    justify-content: center;
  }
`;

const FilterOption = styled.div`
  padding: 0.6rem 0.8rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--color-brand-500);
      color: white;
    `}

  &:hover,
  &:active {
    background-color: var(--color-brand-500);
    color: white;
  }

  @media (max-width: 394px) {
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 363px) {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }
`;

function Filter({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // const { refetch } = useGetBookings();

  function handleFilter(value) {
    // searchParams.set(filterField, value);
    // setSearchParams(searchParams);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(filterField, value);
      params.set("page", 1);
      return params;
    });
  }

  const presentFilter = searchParams.get(filterField) || "all";

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
