import styled from "styled-components";
import { RowFlex } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import ProgressBar from "../../ui/ProgressBar";
import Spinner from "../../ui/Spinner";
import useGetSettings from "../settings/useGetSettings";

export const StyledDiv = styled.div`
  width: 100%;
  grid-column: span 2;
  height: 30rem;
  background: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  @media (min-width: 560px) {
    grid-column: span 1;
  }
`;

const ProgressContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function getBookingStats(bookings = []) {
  return bookings.reduce(
    (stats, booking) => {
      stats.revenue += booking.totalPrice || 0;

      if (booking.hasBreakfast) stats.breakfast++;
      if (booking.isPaid) stats.paid++;

      if (booking.status !== "checked-out") {
        stats.activeBookings++;

        if (booking.status === "checked-in") {
          stats.checkedIn++;
        }
      }

      return stats;
    },
    {
      revenue: 0,
      breakfast: 0,
      paid: 0,
      checkedIn: 0,
      activeBookings: 0,
      totalBookings: bookings.length,
    }
  );
}

function ProgressReport({
  bookings = [],
  isGettingBookings,
  stays,
  isgettingStaysAfterDate,
  lastDays,
}) {
  const { isGettingSettings, settings } = useGetSettings();

  const isWorking =
    isgettingStaysAfterDate || isGettingSettings || isGettingBookings;

  const stats = getBookingStats(bookings);

  const maxRevenueTarget = (settings?.revenueTarget ?? 0) * (lastDays / 30);

  const completedBookings = stays?.filter(
    (booking) => booking.status === "checked-out"
  );

  const progressItems = [
    {
      value: completedBookings?.length,
      max: stays?.length,
      label: "Booking Completion",
      label2: "Checked out guests",
      color: "#3b82f6", // blue
    },
    {
      value: stats.breakfast,
      max: stats.totalBookings,
      label: "Breakfast Opt-in",
      label2: "Wants breakfast",
      color: "#c35506", // orange
    },
    {
      value: stats.paid,
      max: stats.totalBookings,
      label: "Paid fee",
      label2: "Have completed payment",
      color: "#0f9a42", // green
    },
    {
      value: stats.revenue,
      max: maxRevenueTarget,
      label: "Revenue Target",
      label2: "",
      color: "#680ebc", // purple
    },
  ];

  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading as="h2">Progress Report</Heading>
        </Row>
      </RowFlex>

      {isWorking ? (
        <Spinner />
      ) : (
        <ProgressContainer>
          {progressItems.map((item) => (
            <ProgressBar key={item.label} {...item} />
          ))}
        </ProgressContainer>
      )}
    </StyledDiv>
  );
}

export default ProgressReport;
