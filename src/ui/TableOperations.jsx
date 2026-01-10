import styled from "styled-components";
import Filter from "./Filter";
import Sortby from "./Sortby";

const filter = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "no-discount",
    label: "No discount",
  },
  {
    value: "with-discount",
    label: "With discount",
  },
];

const sortBy = [
  {
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    value: "name-dsc",
    label: "Sort by name (Z-A)",
  },
  {
    value: "maxCapacity-asc",
    label: "Sort by capacity (low first)",
  },
  {
    value: "maxCapacity-dsc",
    label: "Sort by capacity (high first)",
  },
  {
    value: "price-asc",
    label: "Sort by price (low first)",
  },
  {
    value: "price-dsc",
    label: "Sort by price (high first)",
  },
];

const StyledOperations = styled.div`
  display: flex;
  gap: 0.5rem;
  /* font-family: "Inter"; */

  @media (min-width: 594px) {
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
  }
`;
function TableOperations() {
  return (
    <StyledOperations>
      <Filter options={filter} />

      <Sortby options={sortBy} />
    </StyledOperations>
  );
}

export default TableOperations;
