import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import { RowFlex } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import ProgressBar from "../../ui/ProgressBar";
import Spinner from "../../ui/Spinner";
import useGetSettings from "../settings/useGetSettings";
import { useSearchParams } from "react-router-dom";

const StyledDiv = styled.div`
  width: 100%;
  grid-column: span 2;
  /* border: 1px solid red; */

  height: 30rem;
  background: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  ${"@media (min-width: 560px)"} {
    grid-column: span 1;
  }
`;

const ProgressContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
//cleaner way to write this code??
function prepareBookingData(bookings, filter) {
  let max = 0;
  let value = 0;

  if (filter === "status") {
    const sorted = bookings.filter(
      (booking) => booking.status !== "checked-out"
    );

    max = sorted.length;
    value = sorted.filter((booking) => booking.status === "checked-in").length;
  } else if (filter === "breakfast" || filter === "paid") {
    max = bookings.length;

    if (filter === "paid") {
      value = bookings.filter((booking) => booking.isPaid === true).length;
    } else {
      value = bookings.filter(
        (booking) => booking.hasBreakfast === true
      ).length;
    }
  } else if (filter === "settings") {
    value = bookings.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);
  }

  return { value, max };
}

function ProgressReport({ bookings, isGettingBookings }) {
  const { isGettingSettings, settings, errorGettingSettings } =
    useGetSettings();

  const [searchParams] = useSearchParams();

  const lastDays = searchParams.get("lastDays");

  const maxRevenueTarget = settings?.revenueTarget * (Number(lastDays) / 30);

  const { value: valueRevenueTarget } = prepareBookingData(
    bookings,
    "settings"
  );

  // console.log(maxRevenueTarget);

  const { value: valueBreakfast, max: maxBreakfast } = prepareBookingData(
    bookings,
    "breakfast"
  );

  const { value: valueIsPaid, max: maxIsPaid } = prepareBookingData(
    bookings,
    "paid"
  );

  const { value: valueCheckin, max: maxCheckIn } = prepareBookingData(
    bookings,
    "status"
  );

  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading as="h3">Progress Report</Heading>
        </Row>
      </RowFlex>

      {isGettingBookings ? (
        <Spinner />
      ) : (
        <ProgressContainer>
          <ProgressBar
            value={valueCheckin}
            max={maxCheckIn}
            label="Booking Completion"
            label2="Checked in guests"
          />
          <ProgressBar
            value={valueBreakfast}
            max={maxBreakfast}
            label="Breakfast Opt-in"
            label2=" Wants breakfast"
          />
          <ProgressBar
            value={valueIsPaid}
            max={maxIsPaid}
            label="Paid fee"
            label2=" Have completed payment"
          />
          <ProgressBar
            value={valueRevenueTarget}
            max={maxRevenueTarget}
            label="Revenue Target"
            label2=""
          />
        </ProgressContainer>
      )}
    </StyledDiv>
  );
}

export default ProgressReport;
