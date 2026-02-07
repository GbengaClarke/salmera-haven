import styled from "styled-components";
import Filter from "./Filter";
// import Sortby from "./Sortby";

const filter = [
  {
    value: "7",
    label: "Last 7 days",
  },
  {
    value: "30",
    label: "Last 30 days",
  },
  {
    value: "90",
    label: "Last 90 days",
  },
];

// const sortBy = [
//   {
//     value: "name-asc",
//     label: "Sort by name (A-Z)",
//   },
//   {
//     value: "name-dsc",
//     label: "Sort by name (Z-A)",
//   },
//   {
//     value: "maxCapacity-asc",
//     label: "Sort by capacity (low first)",
//   },
//   {
//     value: "maxCapacity-dsc",
//     label: "Sort by capacity (high first)",
//   },
//   {
//     value: "regularPrice-asc",
//     label: "Sort by price (low first)",
//   },
//   {
//     value: "regularPrice-dsc",
//     label: "Sort by price (high first)",
//   },
// ];

const StyledOperations = styled.div`
  display: flex;
  /* gap: 0.5rem; */
  margin-top: 1.5rem;

  @media (min-width: 594px) {
    flex-direction: row;
    align-items: center;
    /* gap: 0.8rem; */
  }
`;
function DashboardOperations() {
  return (
    <StyledOperations>
      <Filter options={filter} filterField="lastDays" />

      {/* <Sortby options={sortBy} sortByField="sortBy" /> */}
    </StyledOperations>
  );
}

export default DashboardOperations;
