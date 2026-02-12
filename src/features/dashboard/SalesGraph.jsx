import styled from "styled-components";

import { RowFlex } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import Spinner from "../../ui/Spinner";
import RevenueChart from "./RevenueChart";
import { useSearchParams } from "react-router-dom";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { getToday } from "../../utils/helpers";

const StyledDiv = styled.div`
  grid-column: span 2;

  width: 100%;
  /* height: 30rem; */
  background: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;
`;
function SalesGraph({ bookings = [], isGettingBookings }) {
  const [searchParams] = useSearchParams();

  const lastDays = Number(searchParams.get("lastDays")) || 7;

  const dates = eachDayOfInterval({
    start: subDays(new Date(), lastDays - 1),
    end: new Date(),
  });

  const data = dates.map((datee) => {
    return {
      date: format(datee, "MMM dd"),
      revenue: bookings
        .filter((booking) => {
          return isSameDay(datee, new Date(booking.created_at));
        })
        .reduce((acc, curr) => {
          return acc + curr.totalPrice;
        }, 0),
      extra: bookings
        .filter((booking) => {
          return isSameDay(datee, new Date(booking.created_at));
        })
        .reduce((acc, curr) => {
          return acc + curr.extraPrice;
        }, 0),
    };
  });
  // console.log(data);

  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading as="h3">
            Revenue from {format(dates.at(0), "MMM dd, yyyy")} &mdash;{" "}
            {format(dates.at(-1), "MMM dd, yyyy")}{" "}
          </Heading>
        </Row>
      </RowFlex>

      {isGettingBookings ? (
        <Spinner />
      ) : (
        <RevenueChart lastDays={Number(lastDays)} data={data} />
      )}
    </StyledDiv>
  );
}

export default SalesGraph;
