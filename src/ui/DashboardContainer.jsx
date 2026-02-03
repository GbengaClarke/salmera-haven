import styled from "styled-components";
import { RowFlex, StyledTableContainer } from "./BookingsTableContainer";
import DashboardOperations from "./DashboardOperations";
import Cards from "./Cards";
import { media } from "../styles/breakpoints";
import TodayBookingOverview from "../features/dashboard/TodayBookingOverview";
import StayDuration from "../features/dashboard/StayDuration";
import ProgressBar from "../features/dashboard/ProgressBar";
import SalesGraph from "../features/dashboard/SalesGraph";

const CardRow = styled.div`
  display: flex;
  /* padding: 0.5rem 0.7rem; */
  overflow-x: scroll;
  margin-top: 1.5rem;
  justify-content: space-between;
  align-items: center;

  /* Chrome, Safari */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;

  /* IE / old Edge */
  -ms-overflow-style: none;

  /* border: 1px solid blue; */
`;

const StyledGrid = styled.div`
  display: grid;
  margin-top: 2rem;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;

function DashboardContainer() {
  return (
    <StyledTableContainer>
      <RowFlex $marginLeft="auto" $padding="0">
        {/* <Row>
          <Heading as={"h3"}>Dashboard</Heading>
        </Row> */}

        <DashboardOperations />
      </RowFlex>

      <CardRow>
        <Cards />
      </CardRow>

      <StyledGrid>
        <TodayBookingOverview />
        <StayDuration />
        <ProgressBar />
        <SalesGraph />
      </StyledGrid>
    </StyledTableContainer>
  );
}

export default DashboardContainer;
