import styled from "styled-components";
import Filter from "./Filter";

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

const StyledOperations = styled.div`
  display: flex;

  @media (min-width: 594px) {
    flex-direction: row;
    align-items: center;
  }
`;
function DashboardOperations() {
  return (
    <StyledOperations>
      <Filter options={filter} filterField="lastDays" />
    </StyledOperations>
  );
}

export default DashboardOperations;
