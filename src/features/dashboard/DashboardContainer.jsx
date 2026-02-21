import styled from "styled-components";
import { StyledTableContainer } from "../../ui/BookingsTableContainer";
import DashboardOperations from "../../ui/DashboardOperations";
import Cards from "../../ui/Cards";
import TodayBookingOverview from "./TodayBookingOverview";
import StayDuration from "./StayDuration";
import ProgressReport from "./ProgressReport";
import SalesGraph from "./SalesGraph";

import useDashboardBookings from "./useDashboardBookings";
import useRooms from "../rooms/useRooms";
import useGetStaysAfterDate from "./useGetStaysAfterDate";

const CardRow = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 4.5rem;
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

const StyledPositionAbsolute = styled.div`
  position: fixed;
  right: 10px;
  z-index: 10;
`;

function DashboardContainer() {
  const { rooms } = useRooms();

  const { bookings, scheduledTodayCount, isGettingBookings, lastDays } =
    useDashboardBookings();

  const { stays, isgettingStaysAfterDate, confirmedStays } =
    useGetStaysAfterDate();

  const isLoading = isGettingBookings || isgettingStaysAfterDate;

  //after fully implementing, take out unused properties from getBookingsStats api

  return (
    <StyledTableContainer>
      <StyledPositionAbsolute>
        <DashboardOperations />
      </StyledPositionAbsolute>

      <CardRow>
        <Cards
          bookings={bookings}
          scheduledTodayCount={scheduledTodayCount}
          lastDays={lastDays}
          roomsCount={rooms?.length}
          confirmedStays={confirmedStays}
          stays={stays}
          isLoading={isLoading}
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
          stays={stays}
          isgettingStaysAfterDate={isgettingStaysAfterDate}
          isGettingBookings={isGettingBookings}
          lastDays={lastDays}
        />
        <SalesGraph bookings={bookings} />
      </StyledGrid>
    </StyledTableContainer>
  );
}

export default DashboardContainer;
