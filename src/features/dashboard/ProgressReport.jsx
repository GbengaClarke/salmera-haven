// import styled from "styled-components";
// import { media } from "../../styles/breakpoints";
// import { RowFlex } from "../../ui/BookingsTableContainer";
// import Row from "../../styles/Row";
// import Heading from "../../styles/Heading";
// import ProgressBar from "../../ui/ProgressBar";
// import Spinner from "../../ui/Spinner";
// import useGetSettings from "../settings/useGetSettings";
// import { useSearchParams } from "react-router-dom";

// const StyledDiv = styled.div`
//   width: 100%;
//   grid-column: span 2;
//   /* border: 1px solid red; */

//   height: 30rem;
//   background: var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 1rem;

//   ${"@media (min-width: 560px)"} {
//     grid-column: span 1;
//   }
// `;

// const ProgressContainer = styled.div`
//   padding: 1rem 0;
//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;
// `;

// function prepareBookingData(bookings, filter) {
//   let max = 0;
//   let value = 0;

//   if (filter === "status") {
//     const sorted = bookings.filter(
//       (booking) => booking.status !== "checked-out"
//     );

//     max = sorted.length;
//     value = sorted.filter((booking) => booking.status === "checked-in").length;
//   } else if (filter === "breakfast" || filter === "paid") {
//     max = bookings.length;

//     if (filter === "paid") {
//       value = bookings.filter((booking) => booking.isPaid === true).length;
//     } else {
//       value = bookings.filter(
//         (booking) => booking.hasBreakfast === true
//       ).length;
//     }
//   } else if (filter === "settings") {
//     value = bookings.reduce((acc, curr) => {
//       return acc + curr.totalPrice;
//     }, 0);
//   }

//   return { value, max };
// }

// function ProgressReport({ bookings, isGettingBookings }) {
//   const { isGettingSettings, settings, errorGettingSettings } =
//     useGetSettings();

//   const [searchParams] = useSearchParams();

//   const lastDays = searchParams.get("lastDays");

//   const maxRevenueTarget =
//     settings?.revenueTarget * (Number(lastDays || 7) / 30);

//   const { value: valueRevenueTarget } = prepareBookingData(
//     bookings,
//     "settings"
//   );

//   const { value: valueBreakfast, max: maxBreakfast } = prepareBookingData(
//     bookings,
//     "breakfast"
//   );

//   const { value: valueIsPaid, max: maxIsPaid } = prepareBookingData(
//     bookings,
//     "paid"
//   );

//   const { value: valueCheckin, max: maxCheckIn } = prepareBookingData(
//     bookings,
//     "status"
//   );

//   return (
//     <StyledDiv>
//       <RowFlex>
//         <Row>
//           <Heading as="h3">Progress Report</Heading>
//         </Row>
//       </RowFlex>

//       {isGettingBookings ? (
//         <Spinner />
//       ) : (
//         <ProgressContainer>
//           <ProgressBar
//             value={valueCheckin}
//             max={maxCheckIn}
//             label="Booking Completion"
//             label2="Checked in guests"
//           />
//           <ProgressBar
//             value={valueBreakfast}
//             max={maxBreakfast}
//             label="Breakfast Opt-in"
//             label2=" Wants breakfast"
//           />
//           <ProgressBar
//             value={valueIsPaid}
//             max={maxIsPaid}
//             label="Paid fee"
//             label2=" Have completed payment"
//           />
//           <ProgressBar
//             value={valueRevenueTarget}
//             max={maxRevenueTarget}
//             label="Revenue Target"
//             label2=""
//           />
//         </ProgressContainer>
//       )}
//     </StyledDiv>
//   );
// }

// export default ProgressReport;

import styled from "styled-components";
import { RowFlex } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import ProgressBar from "../../ui/ProgressBar";
import Spinner from "../../ui/Spinner";
import useGetSettings from "../settings/useGetSettings";
import { useSearchParams } from "react-router-dom";

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
  // const [searchParams] = useSearchParams();
  // const lastDays = Number(searchParams.get("lastDays") ?? 7);
  const { isGettingSettings, settings } = useGetSettings();

  const isWorking =
    isgettingStaysAfterDate || isGettingSettings || isGettingBookings;

  const stats = getBookingStats(bookings);

  //  Revenue Target Calculation
  const maxRevenueTarget = (settings?.revenueTarget ?? 0) * (lastDays / 30);

  //completion rate
  const completedBookings = stays?.filter(
    (booking) => booking.status === "checked-out"
  );

  const progressItems = [
    {
      value: completedBookings?.length,
      max: stays?.length,
      label: "Booking Completion",
      label2: "Checked out guests",
    },
    {
      value: stats.breakfast,
      max: stats.totalBookings,
      label: "Breakfast Opt-in",
      label2: "Wants breakfast",
    },
    {
      value: stats.paid,
      max: stats.totalBookings,
      label: "Paid fee",
      label2: "Have completed payment",
    },
    {
      value: stats.revenue,
      max: maxRevenueTarget,
      label: "Revenue Target",
      label2: "",
    },
  ];

  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading as="h3">Progress Report</Heading>
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
