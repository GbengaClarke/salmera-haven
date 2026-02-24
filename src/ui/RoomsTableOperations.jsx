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
    value: "regularPrice-asc",
    label: "Sort by price (low first)",
  },
  {
    value: "regularPrice-dsc",
    label: "Sort by price (high first)",
  },
];

const StyledOperations = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  gap: 0.7rem;
  align-items: end;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;
function RoomsTableOperations() {
  return (
    <StyledOperations>
      <Filter options={filter} filterField="discount" />

      <Sortby options={sortBy} sortByField="sortBy" />
    </StyledOperations>
  );
}

export default RoomsTableOperations;
