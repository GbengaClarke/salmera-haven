import styled from "styled-components";
import { RowFlex, TableWrapper } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import TodaysBookingOverviewTable from "./TodaysBookingOverviewTable";

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-column: span 2;
  max-height: 30rem;
  /* height: 30rem; */
  /* background: var(--color-grey-100); */
  background: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  padding: 1rem 0;
`;

const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;

  /* Slim Scrollbar - Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-400);
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) transparent;
`;

function TodayBookingOverview() {
  return (
    <StyledTableContainer>
      <RowFlex>
        <Row>
          <Heading as="h3">Today’s Booking Overview</Heading>
        </Row>
      </RowFlex>

      <ScrollContent>
        <Row>
          <TableWrapper>
            <TodaysBookingOverviewTable />
          </TableWrapper>
        </Row>
      </ScrollContent>
    </StyledTableContainer>
  );
}

export default TodayBookingOverview;
