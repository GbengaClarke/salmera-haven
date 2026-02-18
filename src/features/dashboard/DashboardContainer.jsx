import styled from "styled-components";
import { RowFlex, StyledTableContainer } from "../../ui/BookingsTableContainer";
import DashboardOperations from "../../ui/DashboardOperations";
import Cards from "../../ui/Cards";
import TodayBookingOverview from "./TodayBookingOverview";
import StayDuration from "./StayDuration";
import ProgressReport from "./ProgressReport";
import SalesGraph from "./SalesGraph";

import useDashboardBookings from "./useDashboardBookings";
import useRooms from "../rooms/useRooms";

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
  const { rooms } = useRooms();

  const {
    bookings,
    scheduledTodayCount,
    errorGettingBookings,
    isGettingBookings,
    lastDays,
    confirmedStays,
  } = useDashboardBookings();

  //after fully implementing, take out unused properties from getBookingsStats

  return (
    <StyledTableContainer>
      <RowFlex $marginLeft="auto" $padding="0">
        <DashboardOperations />
      </RowFlex>

      <CardRow>
        <Cards
          bookings={bookings}
          scheduledTodayCount={scheduledTodayCount}
          lastDays={lastDays}
          roomsCount={rooms?.length}
          confirmedStays={confirmedStays}
        />
      </CardRow>

      <StyledGrid>
        <TodayBookingOverview />
        <StayDuration
          bookings={bookings}
          isGettingBookings={isGettingBookings}
        />
        <ProgressReport
          bookings={bookings}
          isGettingBookings={isGettingBookings}
        />
        <SalesGraph bookings={bookings} />
      </StyledGrid>
    </StyledTableContainer>
  );
}

export default DashboardContainer;
