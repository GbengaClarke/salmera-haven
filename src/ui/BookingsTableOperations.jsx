import styled from "styled-components";
import Filter from "./Filter";
import Sortby from "./Sortby";

const filter = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

const sortBy = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  { value: "fullName-asc", label: "Sort by name (A-Z)" },
  { value: "fullName-desc", label: "Sort by name (Z-A)" },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
  { value: "id-asc", label: "Sort by booking ID (low first)" },
  { value: "id-desc", label: "Sort by booking ID (high first)" },
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
function BookingsTableOperations() {
  return (
    <StyledOperations>
      <Filter filterField="status" options={filter} />

      <Sortby sortByField="sortBy" options={sortBy} />
    </StyledOperations>
  );
}

export default BookingsTableOperations;
